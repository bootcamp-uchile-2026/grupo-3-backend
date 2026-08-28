import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { GetProductoDto } from './dto/get-producto.dto';

@Injectable()
export class ProductosService {
  private productos: Producto[] = [];

  create(createProductoDto: CreateProductoDto): GetProductoDto {
    const newProducto: Producto = {
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'Producto',
      ...createProductoDto,
    };
    this.productos.push(newProducto);
    return this.mapToGetDto(newProducto);
  }

  findAll(): GetProductoDto[] {
    return this.productos.map((p) => this.mapToGetDto(p));
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
    const updatedProd = {
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

  private mapToGetDto(producto: Producto): GetProductoDto {
    return {
      id: producto.id,
      nombre: producto.nombre,
      tipo: producto.tipo,
      descripcion: producto.descripcion,
      marca: producto.marca,
      precio: producto.precio,
      especie: producto.especie,
      rangoEdad: producto.rangoEdad,
      descuento: producto.descuento,
      cantidad: producto.cantidad,
      fichaTecnica: producto.fichaTecnica,
      stock: producto.stock,
    };
  }
}
