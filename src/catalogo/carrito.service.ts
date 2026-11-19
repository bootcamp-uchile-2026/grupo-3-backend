import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  // Cupones válidos de ejemplo para la tienda
  private cuponesValidos: Record<
    string,
    { tipo: 'porcentaje' | 'monto'; valor: number }
  > = {
    PETLOVE10: { tipo: 'porcentaje', valor: 10 },
    BIENVENIDA: { tipo: 'monto', valor: 3000 },
    VERANO: { tipo: 'porcentaje', valor: 15 },
  };

  constructor(
    @InjectRepository(Carrito)
    private readonly carritosRepo: Repository<Carrito>,
    @InjectRepository(ItemCarrito)
    private readonly itemsRepo: Repository<ItemCarrito>,
    private readonly productosService: ProductosService,
  ) {}

  async crear(): Promise<GetCarritoDto> {
    const carrito = this.carritosRepo.create({
      id: randomUUID(),
      items: [],
      descuentoCupon: 0,
      subtotal: 0,
      totalArticulos: 0,
      total: 0,
    });
    const saved = await this.carritosRepo.save(carrito);
    return this.mapToDto(saved);
  }

  async obtener(carritoId: string): Promise<Carrito> {
    const carrito = await this.carritosRepo.findOne({
      where: { id: carritoId },
      relations: { items: true },
    });
    if (!carrito) {
      throw new RecursoNoEncontradoError(
        `El carrito con ID ${carritoId} no existe.`,
      );
    }
    if (!carrito.items) {
      carrito.items = [];
    }
    return carrito;
  }

  async getCarrito(carritoId: string): Promise<GetCarritoDto> {
    const carrito = await this.obtener(carritoId);
    this.recalcularTotales(carrito);
    await this.carritosRepo.save(carrito);
    return this.mapToDto(carrito);
  }

  async addItem(
    carritoId: string,
    dto: AgregarAlCarritoDto,
  ): Promise<GetCarritoDto> {
    const carrito = await this.obtener(carritoId);
    const producto = await this.productosService.findOneEntity(dto.productoId);
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
      await this.itemsRepo.save(itemExistente);
    } else {
      const nuevoItem = this.itemsRepo.create({
        carritoId: carrito.id,
        productoId: producto.id,
        nombre: producto.nombre,
        marca: producto.marca,
        imagen: producto.imagenes?.[0] ?? '',
        precioOriginal: producto.precioOriginal,
        precioUnitario: producto.precio,
        cantidad,
        subtotal: cantidad * producto.precio,
      });
      const savedItem = await this.itemsRepo.save(nuevoItem);
      carrito.items.push(savedItem);
    }

    this.recalcularTotales(carrito);
    const saved = await this.carritosRepo.save(carrito);
    return this.mapToDto(saved);
  }

  async updateQuantity(
    carritoId: string,
    productoId: string,
    dto: ActualizarCantidadItemDto,
  ): Promise<GetCarritoDto> {
    const carrito = await this.obtener(carritoId);
    const item = carrito.items.find((it) => it.productoId === productoId);

    if (!item) {
      throw new RecursoNoEncontradoError(
        `El producto con ID ${productoId} no está en el carrito`,
      );
    }

    const producto = await this.productosService.findOneEntity(productoId);
    if (producto.stock < dto.cantidad) {
      throw new StockInsuficienteError(producto.stock, producto.nombre);
    }

    item.cantidad = dto.cantidad;
    item.subtotal = item.cantidad * item.precioUnitario;
    await this.itemsRepo.save(item);

    this.recalcularTotales(carrito);
    const saved = await this.carritosRepo.save(carrito);
    return this.mapToDto(saved);
  }

  async removeItem(
    carritoId: string,
    productoId: string,
  ): Promise<GetCarritoDto> {
    const carrito = await this.obtener(carritoId);
    const item = carrito.items.find((it) => it.productoId === productoId);
    if (item && item.id) {
      await this.itemsRepo.delete(item.id);
    }
    carrito.items = carrito.items.filter((it) => it.productoId !== productoId);
    this.recalcularTotales(carrito);
    const saved = await this.carritosRepo.save(carrito);
    return this.mapToDto(saved);
  }

  async aplicarCupon(
    carritoId: string,
    dto: AplicarCuponDto,
  ): Promise<GetCarritoDto> {
    const carrito = await this.obtener(carritoId);

    const cuponUpper = dto.codigoCupon.trim().toUpperCase();
    if (!this.cuponesValidos[cuponUpper]) {
      throw new ReglaNegocioError(
        `El cupón "${dto.codigoCupon}" no es válido o ha expirado`,
      );
    }

    carrito.cuponAplicado = cuponUpper;
    this.recalcularTotales(carrito);
    const saved = await this.carritosRepo.save(carrito);
    return this.mapToDto(saved);
  }

  async removerCupon(carritoId: string): Promise<GetCarritoDto> {
    const carrito = await this.obtener(carritoId);
    carrito.cuponAplicado = undefined;
    carrito.descuentoCupon = 0;
    this.recalcularTotales(carrito);
    await this.carritosRepo.update(carrito.id, {
      cuponAplicado: null as unknown as undefined,
      descuentoCupon: 0,
      subtotal: carrito.subtotal,
      totalArticulos: carrito.totalArticulos,
      total: carrito.total,
    });
    return this.mapToDto(carrito);
  }

  async cerrar(carritoId: string): Promise<void> {
    await this.itemsRepo.delete({ carritoId });
    await this.carritosRepo.delete(carritoId);
  }

  private recalcularTotales(carrito: Carrito): void {
    carrito.subtotal = carrito.items.reduce(
      (acc, it) => acc + Number(it.subtotal),
      0,
    );
    carrito.totalArticulos = carrito.items.reduce(
      (acc, it) => acc + Number(it.cantidad),
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
      items: (carrito.items || []).map((it) => ({
        productoId: it.productoId,
        nombre: it.nombre,
        marca: it.marca,
        imagen: it.imagen,
        precioOriginal: it.precioOriginal,
        precioUnitario: it.precioUnitario,
        cantidad: it.cantidad,
        subtotal: it.subtotal,
      })),
      totalArticulos: carrito.totalArticulos,
      subtotal: carrito.subtotal,
      cuponAplicado: carrito.cuponAplicado ?? undefined,
      descuentoCupon: carrito.descuentoCupon,
      total: carrito.total,
    };
  }
}
