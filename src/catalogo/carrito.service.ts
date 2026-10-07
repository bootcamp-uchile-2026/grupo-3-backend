import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Carrito, ItemCarrito } from './entities/carrito.entity';
import {
  AgregarAlCarritoDto,
  ActualizarCantidadItemDto,
  AplicarCuponDto,
  GetCarritoDto,
} from './dto/carrito.dto';
import { ProductosService } from './productos.service';

@Injectable()
export class CarritoService {
  // Manejo de carritos por usuario (o 'invitado' por defecto)
  private carritos: Map<string, Carrito> = new Map();

  // Cupones válidos de ejemplo para la tienda
  private cuponesValidos: Record<string, { tipo: 'porcentaje' | 'monto'; valor: number }> = {
    PETLOVE10: { tipo: 'porcentaje', valor: 10 },
    BIENVENIDA: { tipo: 'monto', valor: 3000 },
    VERANO: { tipo: 'porcentaje', valor: 15 },
  };

  constructor(private readonly productosService: ProductosService) {}

  private obtenerOcrearCarrito(usuarioId: string = 'invitado'): Carrito {
    if (!this.carritos.has(usuarioId)) {
      const nuevoCarrito: Carrito = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        usuarioId,
        items: [],
        descuentoCupon: 0,
        subtotal: 0,
        totalArticulos: 0,
        total: 0,
      };
      this.carritos.set(usuarioId, nuevoCarrito);
    }
    return this.carritos.get(usuarioId)!;
  }

  getCarrito(usuarioId: string = 'invitado'): GetCarritoDto {
    const carrito = this.obtenerOcrearCarrito(usuarioId);
    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  addItem(dto: AgregarAlCarritoDto): GetCarritoDto {
    const usuarioId = dto.usuarioId || 'invitado';
    const carrito = this.obtenerOcrearCarrito(usuarioId);
    const producto = this.productosService.findOneEntity(dto.productoId);

    if (producto.stock < dto.cantidad) {
      throw new BadRequestException(
        `Stock insuficiente para "${producto.nombre}". Disponible: ${producto.stock}`,
      );
    }

    const itemExistente = carrito.items.find(
      (it) => it.productoId === dto.productoId,
    );

    if (itemExistente) {
      const nuevaCantidad = itemExistente.cantidad + (dto.cantidad || 1);
      if (producto.stock < nuevaCantidad) {
        throw new BadRequestException(
          `No puedes agregar más unidades. Stock disponible: ${producto.stock}`,
        );
      }
      itemExistente.cantidad = nuevaCantidad;
      itemExistente.subtotal = itemExistente.cantidad * itemExistente.precioUnitario;
    } else {
      const nuevoItem: ItemCarrito = {
        productoId: producto.id,
        nombre: producto.nombre,
        marca: producto.marca,
        imagen: producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0] : '',
        precioOriginal: producto.precioOriginal,
        precioUnitario: producto.precio,
        cantidad: dto.cantidad || 1,
        subtotal: (dto.cantidad || 1) * producto.precio,
      };
      carrito.items.push(nuevoItem);
    }

    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  updateQuantity(
    productoId: string,
    dto: ActualizarCantidadItemDto,
  ): GetCarritoDto {
    const usuarioId = dto.usuarioId || 'invitado';
    const carrito = this.obtenerOcrearCarrito(usuarioId);
    const item = carrito.items.find((it) => it.productoId === productoId);

    if (!item) {
      throw new NotFoundException(`El producto con ID ${productoId} no está en el carrito`);
    }

    if (dto.cantidad <= 0) {
      return this.removeItem(productoId, usuarioId);
    }

    const producto = this.productosService.findOneEntity(productoId);
    if (producto.stock < dto.cantidad) {
      throw new BadRequestException(
        `Stock insuficiente. Disponible: ${producto.stock}`,
      );
    }

    item.cantidad = dto.cantidad;
    item.subtotal = item.cantidad * item.precioUnitario;

    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  removeItem(productoId: string, usuarioId: string = 'invitado'): GetCarritoDto {
    const carrito = this.obtenerOcrearCarrito(usuarioId);
    carrito.items = carrito.items.filter((it) => it.productoId !== productoId);
    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  aplicarCupon(dto: AplicarCuponDto): GetCarritoDto {
    const usuarioId = dto.usuarioId || 'invitado';
    const carrito = this.obtenerOcrearCarrito(usuarioId);

    const cuponUpper = dto.codigoCupon.trim().toUpperCase();
    const configCupon = this.cuponesValidos[cuponUpper];

    if (!configCupon) {
      throw new BadRequestException(`El cupón "${dto.codigoCupon}" no es válido o ha expirado`);
    }

    carrito.cuponAplicado = cuponUpper;
    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  removerCupon(usuarioId: string = 'invitado'): GetCarritoDto {
    const carrito = this.obtenerOcrearCarrito(usuarioId);
    delete carrito.cuponAplicado;
    carrito.descuentoCupon = 0;
    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  vaciarCarrito(usuarioId: string = 'invitado'): void {
    const carrito = this.obtenerOcrearCarrito(usuarioId);
    carrito.items = [];
    delete carrito.cuponAplicado;
    carrito.descuentoCupon = 0;
    this.recalcularTotales(carrito);
  }

  private recalcularTotales(carrito: Carrito): void {
    carrito.subtotal = carrito.items.reduce((acc, it) => acc + it.subtotal, 0);
    carrito.totalArticulos = carrito.items.reduce((acc, it) => acc + it.cantidad, 0);

    let descuento = 0;
    if (carrito.cuponAplicado && this.cuponesValidos[carrito.cuponAplicado]) {
      const conf = this.cuponesValidos[carrito.cuponAplicado];
      if (conf.tipo === 'porcentaje') {
        descuento = Math.round((carrito.subtotal * conf.valor) / 100);
      } else {
        descuento = conf.valor;
      }
    }

    carrito.descuentoCupon = Math.min(descuento, carrito.subtotal);
    carrito.total = Math.max(0, carrito.subtotal - carrito.descuentoCupon);
  }

  private mapToDto(carrito: Carrito): GetCarritoDto {
    return {
      id: carrito.id,
      usuarioId: carrito.usuarioId,
      items: carrito.items.map((it) => ({ ...it })),
      totalArticulos: carrito.totalArticulos,
      subtotal: carrito.subtotal,
      cuponAplicado: carrito.cuponAplicado,
      descuentoCupon: carrito.descuentoCupon,
      total: carrito.total,
    };
  }
}
