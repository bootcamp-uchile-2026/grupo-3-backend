import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './entities/producto.entity';
import { Resena } from './entities/resena.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { GetProductoDto } from './dto/get-producto.dto';
import { FilterProductoDto } from './dto/filter-producto.dto';
import { CreateResenaDto } from './dto/create-resena.dto';
import { GetResenaDto } from './dto/get-resena.dto';

@Injectable()
export class ProductosService {
  private productos: Producto[] = [];
  private resenas: Resena[] = [];

  create(createProductoDto: CreateProductoDto): GetProductoDto {
    const newProducto: Producto = {
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'Producto',
      calificacionPromedio: 0,
      totalResenas: 0,
      descuento: createProductoDto.descuento ?? 0,
      cantidad: createProductoDto.cantidad ?? 1,
      fichaTecnica: createProductoDto.fichaTecnica ?? '',
      ...createProductoDto,
    };
    this.productos.push(newProducto);
    return this.mapToGetDto(newProducto);
  }

  findAll(filters?: FilterProductoDto): GetProductoDto[] {
    let result = [...this.productos];

    if (!filters) {
      return result.map((p) => this.mapToGetDto(p));
    }

    // 1. Búsqueda por texto libre
    if (filters.buscar) {
      const q = filters.buscar.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q) ||
          p.marca.toLowerCase().includes(q),
      );
    }

    // 2. Filtro por especie
    if (filters.especie) {
      const esp = filters.especie.toLowerCase();
      result = result.filter(
        (p) =>
          p.especie.toLowerCase() === 'todos' ||
          p.especie.toLowerCase() === esp,
      );
    }

    // 3. Filtro por categoría
    if (filters.categoria) {
      const cat = filters.categoria.toLowerCase();
      result = result.filter((p) => p.categoria.toLowerCase() === cat);
    }

    // 4. Filtro por subcategoría
    if (filters.subcategoria) {
      const sub = filters.subcategoria.toLowerCase();
      result = result.filter(
        (p) => p.subcategoria && p.subcategoria.toLowerCase() === sub,
      );
    }

    // 5. Filtro por rango de edad
    if (filters.rangoEdad) {
      const rango = filters.rangoEdad.toLowerCase();
      result = result.filter(
        (p) =>
          !p.rangoEdad ||
          p.rangoEdad.toLowerCase() === 'todos' ||
          p.rangoEdad.toLowerCase() === rango,
      );
    }

    // 6. Filtro por material
    if (filters.material) {
      const mat = filters.material.toLowerCase();
      result = result.filter(
        (p) => p.material && p.material.toLowerCase() === mat,
      );
    }

    // 7. Filtro por marca
    if (filters.marca) {
      const marca = filters.marca.toLowerCase();
      result = result.filter((p) => p.marca.toLowerCase() === marca);
    }

    // 8. Filtro solo ofertas
    if (filters.enOferta === true || String(filters.enOferta) === 'true') {
      result = result.filter((p) => (p.descuento ?? 0) > 0);
    }

    // 9. Ordenamiento
    if (filters.orden) {
      switch (filters.orden) {
        case 'precio_asc':
          result.sort((a, b) => a.precio - b.precio);
          break;
        case 'precio_desc':
          result.sort((a, b) => b.precio - a.precio);
          break;
        case 'calificacion':
          result.sort(
            (a, b) => (b.calificacionPromedio || 0) - (a.calificacionPromedio || 0),
          );
          break;
        case 'popularidad':
        default:
          result.sort(
            (a, b) => (b.totalResenas || 0) - (a.totalResenas || 0),
          );
          break;
      }
    }

    // 10. Paginación
    const offset = Number(filters.offset) || 0;
    const limit = Number(filters.limit) || result.length;
    result = result.slice(offset, offset + limit);

    return result.map((p) => this.mapToGetDto(p));
  }

  findOfertas(limit: number = 8): GetProductoDto[] {
    return this.productos
      .filter((p) => (p.descuento ?? 0) > 0)
      .slice(0, limit)
      .map((p) => this.mapToGetDto(p));
  }

  findRelacionados(id: string, limit: number = 4): GetProductoDto[] {
    const target = this.productos.find((p) => p.id === id);
    if (!target) {
      return [];
    }
    return this.productos
      .filter(
        (p) =>
          p.id !== id &&
          (p.categoria === target.categoria || p.especie === target.especie),
      )
      .slice(0, limit)
      .map((p) => this.mapToGetDto(p));
  }

  findSugeridos(limit: number = 4): GetProductoDto[] {
    return this.productos
      .slice(0, limit)
      .map((p) => this.mapToGetDto(p));
  }

  findOne(id: string): GetProductoDto {
    const producto = this.productos.find((p) => p.id === id);
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return this.mapToGetDto(producto);
  }

  findOneEntity(id: string): Producto {
    const producto = this.productos.find((p) => p.id === id);
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  update(
    id: string,
    updateProductoDto: Partial<CreateProductoDto>,
  ): GetProductoDto {
    const prodIndex = this.productos.findIndex((p) => p.id === id);
    if (prodIndex === -1) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    const updatedProd: Producto = {
      ...this.productos[prodIndex],
      ...updateProductoDto,
    };
    this.productos[prodIndex] = updatedProd;
    return this.mapToGetDto(updatedProd);
  }

  remove(id: string): { message: string } {
    const prodIndex = this.productos.findIndex((p) => p.id === id);
    if (prodIndex === -1) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    this.productos.splice(prodIndex, 1);
    this.resenas = this.resenas.filter((r) => r.productoId !== id);
    return { message: `Producto con ID ${id} eliminado correctamente` };
  }

  decreaseStock(id: string, qty: number): void {
    const producto = this.findOneEntity(id);
    if (producto.stock < qty) {
      throw new Error(
        `Stock insuficiente para el producto ${producto.nombre}. Disponible: ${producto.stock}, Solicitado: ${qty}`,
      );
    }
    producto.stock -= qty;
  }

  // --- Manejo de Reseñas de Clientes ---
  addResena(
    productoId: string,
    createResenaDto: CreateResenaDto,
  ): GetResenaDto {
    const producto = this.findOneEntity(productoId);

    const newResena: Resena = {
      id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      productoId,
      ...createResenaDto,
      fecha: new Date(),
    };
    this.resenas.push(newResena);

    // Recalcular promedio de estrellas y total
    const productoResenas = this.resenas.filter((r) => r.productoId === productoId);
    producto.totalResenas = productoResenas.length;
    const sum = productoResenas.reduce((acc, curr) => acc + curr.calificacion, 0);
    producto.calificacionPromedio = Number((sum / productoResenas.length).toFixed(1));

    return this.mapToResenaDto(newResena);
  }

  findResenas(productoId: string, filtro?: string): GetResenaDto[] {
    this.findOne(productoId); // valida existencia
    let lista = this.resenas.filter((r) => r.productoId === productoId);

    if (filtro) {
      const f = filtro.toLowerCase();
      if (f === 'positivas') {
        lista = lista.filter((r) => r.calificacion >= 4);
      } else if (f === 'neutras') {
        lista = lista.filter((r) => r.calificacion === 3);
      } else if (f === 'criticas') {
        lista = lista.filter((r) => r.calificacion <= 2);
      } else if (!isNaN(Number(f))) {
        lista = lista.filter((r) => r.calificacion === Number(f));
      }
    }

    return lista.map((r) => this.mapToResenaDto(r));
  }

  private mapToGetDto(producto: Producto): GetProductoDto {
    return {
      id: producto.id,
      nombre: producto.nombre,
      sku: producto.sku,
      tipo: producto.tipo,
      descripcion: producto.descripcion,
      marca: producto.marca,
      precio: producto.precio,
      precioOriginal: producto.precioOriginal,
      stock: producto.stock,
      imagenes: producto.imagenes || [],
      categoria: producto.categoria,
      subcategoria: producto.subcategoria,
      especie: producto.especie,
      rangoEdad: producto.rangoEdad,
      material: producto.material,
      descuento: producto.descuento,
      cantidad: producto.cantidad,
      fichaTecnica: producto.fichaTecnica,
      modoDeUso: producto.modoDeUso,
      fichaTecnicaDetalle: producto.fichaTecnicaDetalle,
      calificacionPromedio: producto.calificacionPromedio || 0,
      totalResenas: producto.totalResenas || 0,
    };
  }

  private mapToResenaDto(resena: Resena): GetResenaDto {
    return {
      id: resena.id,
      productoId: resena.productoId,
      usuarioId: resena.usuarioId,
      nombreUsuario: resena.nombreUsuario,
      calificacion: resena.calificacion,
      titulo: resena.titulo,
      comentario: resena.comentario,
      fecha: resena.fecha,
    };
  }
}
