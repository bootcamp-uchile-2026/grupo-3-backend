import { Injectable } from '@nestjs/common';
import { Carrito, ItemCarrito } from './entities/carrito.entity';
import {
  AgregarAlCarritoDto,
  ActualizarCantidadItemDto,
  AplicarCuponDto,
  GetCarritoDto,
} from './dto/carrito.dto';
import { ProductosService } from './productos.service';
import { StockInsuficienteError } from 'src/common/errors/stock-insuficiente.error';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';
import { randomUUID } from 'crypto';
import { ReglaNegocioError } from 'src/common/errors/regla-negocio.error';

@Injectable()
export class CarritoService {
  // Manejo de carritos por usuario (o 'invitado' por defecto)
  private carritos: Map<string, Carrito> = new Map();

  // Cupones válidos de ejemplo para la tienda
  private cuponesValidos: Record<
    string,
    { tipo: 'porcentaje' | 'monto'; valor: number }
  > = {
    PETLOVE10: { tipo: 'porcentaje', valor: 10 },
    BIENVENIDA: { tipo: 'monto', valor: 3000 },
    VERANO: { tipo: 'porcentaje', valor: 15 },
  };

  constructor(private readonly productosService: ProductosService) {}

  crear(): GetCarritoDto {
    const carrito: Carrito = {
      id: randomUUID(),
      items: [],
      descuentoCupon: 0,
      subtotal: 0,
      totalArticulos: 0,
      total: 0,
    };
    this.carritos.set(carrito.id, carrito);
    return this.mapToDto(carrito);
  }

  obtener(carritoId: string): Carrito {
    const carrito = this.carritos.get(carritoId);
    if (!carrito) {
      throw new RecursoNoEncontradoError(
        `El carrito con ID ${carritoId} no existe.`,
      );
    }
    return carrito;
  }

  getCarrito(carritoId: string): GetCarritoDto {
    const carrito = this.obtener(carritoId);
    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  addItem(carritoId: string, dto: AgregarAlCarritoDto): GetCarritoDto {
    const carrito = this.obtener(carritoId);
    const producto = this.productosService.findOneEntity(dto.productoId);
    const cantidad = dto.cantidad ?? 1;

    const itemExistente = carrito.items.find(
      (it) => it.productoId === dto.productoId,
    );
    const cantidadTotal = (itemExistente?.cantidad ?? 0) + cantidad;

    if (producto.stock < cantidadTotal) {
      throw new StockInsuficienteError(producto.stock, producto.nombre);
    }

    if (itemExistente) {
      itemExistente.cantidad = cantidadTotal;
      itemExistente.subtotal =
        itemExistente.cantidad * itemExistente.precioUnitario;
    } else {
      const nuevoItem: ItemCarrito = {
        productoId: producto.id,
        nombre: producto.nombre,
        marca: producto.marca,
        imagen: producto.imagenes?.[0] ?? '',
        precioOriginal: producto.precioOriginal,
        precioUnitario: producto.precio,
        cantidad,
        subtotal: cantidad * producto.precio,
      };
      carrito.items.push(nuevoItem);
    }

    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  updateQuantity(
    carritoId: string,
    productoId: string,
    dto: ActualizarCantidadItemDto,
  ): GetCarritoDto {
    const carrito = this.obtener(carritoId);
    const item = carrito.items.find((it) => it.productoId === productoId);

    if (!item) {
      throw new RecursoNoEncontradoError(
        `El producto con ID ${productoId} no está en el carrito`,
      );
    }

    const producto = this.productosService.findOneEntity(productoId);
    if (producto.stock < dto.cantidad) {
      throw new StockInsuficienteError(producto.stock, producto.nombre);
    }

    item.cantidad = dto.cantidad;
    item.subtotal = item.cantidad * item.precioUnitario;

    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  removeItem(carritoId: string, productoId: string): GetCarritoDto {
    const carrito = this.obtener(carritoId);
    carrito.items = carrito.items.filter((it) => it.productoId !== productoId);
    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  aplicarCupon(carritoId: string, dto: AplicarCuponDto): GetCarritoDto {
    const carrito = this.obtener(carritoId);

    const cuponUpper = dto.codigoCupon.trim().toUpperCase();
    if (!this.cuponesValidos[cuponUpper]) {
      throw new ReglaNegocioError(
        `El cupón "${dto.codigoCupon}" no es válido o ha expirado`,
      );
    }

    carrito.cuponAplicado = cuponUpper;
    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  removerCupon(carritoId: string): GetCarritoDto {
    const carrito = this.obtener(carritoId);
    delete carrito.cuponAplicado;
    carrito.descuentoCupon = 0;
    this.recalcularTotales(carrito);
    return this.mapToDto(carrito);
  }

  cerrar(carritoId: string): void {
    this.carritos.delete(carritoId);
  }

  private recalcularTotales(carrito: Carrito): void {
    carrito.subtotal = carrito.items.reduce((acc, it) => acc + it.subtotal, 0);
    carrito.totalArticulos = carrito.items.reduce(
      (acc, it) => acc + it.cantidad,
      0,
    );

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
      items: carrito.items.map((it) => ({ ...it })),
      totalArticulos: carrito.totalArticulos,
      subtotal: carrito.subtotal,
      cuponAplicado: carrito.cuponAplicado,
      descuentoCupon: carrito.descuentoCupon,
      total: carrito.total,
    };
  }
}
