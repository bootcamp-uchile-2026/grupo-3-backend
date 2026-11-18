import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, ItemPedido } from './entities/pedido.entity';
import {
  CreatePedidoDto,
  GetPedidoDto,
  SeguimientoPedidoDto,
} from './dto/pedido.dto';
import { CarritoService } from './carrito.service';
import { ProductosService } from './productos.service';
import { ReglaNegocioError } from 'src/common/errors/regla-negocio.error';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';
import { StockInsuficienteError } from 'src/common/errors/stock-insuficiente.error';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepo: Repository<Pedido>,
    @InjectRepository(ItemPedido)
    private readonly pedidoItemsRepo: Repository<ItemPedido>,
    private readonly carritoService: CarritoService,
    private readonly productosService: ProductosService,
  ) {}

  async create(
    carritoId: string,
    dto: CreatePedidoDto,
  ): Promise<GetPedidoDto> {
    if (!dto.aceptaTerminos) {
      throw new ReglaNegocioError(
        'Debes aceptar los términos y condiciones para continuar.',
      );
    }

    const carrito = await this.carritoService.obtener(carritoId);

    if (carrito.items.length === 0) {
      throw new ReglaNegocioError('El carrito de compras está vacío.');
    }

    // 1. Validar y descontar stock de cada producto
    for (const item of carrito.items) {
      const producto = await this.productosService.findOneEntity(
        item.productoId,
      );
      if (producto.stock < item.cantidad) {
        throw new StockInsuficienteError(producto.stock, producto.nombre);
      }
    }

    for (const item of carrito.items) {
      await this.productosService.decreaseStock(item.productoId, item.cantidad);
    }

    // 2. Determinar costo de envío y dirección
    const esDelivery = dto.tipoEntrega === 'EnvioNormal';
    const costoEnvio = esDelivery ? 3990 : 0;
    const tiempoEstimado = esDelivery
      ? '2 a 3 días hábiles'
      : 'Retiro inmediato en horario hábil';

    let direccionCompleta = dto.direccion;
    if (esDelivery && dto.direccion) {
      const depto = dto.departamentoOficina
        ? `, ${dto.departamentoOficina}`
        : '';
      const com = dto.comuna ? `, ${dto.comuna}` : '';
      const reg = dto.region ? `, ${dto.region}` : '';
      direccionCompleta = `${dto.direccion}${depto}${com}${reg}`;
    }

    // 3. Crear ítems del pedido
    const orderId = await this.generarNumeroOrden();
    const itemsPedido: ItemPedido[] = carrito.items.map((it) =>
      this.pedidoItemsRepo.create({
        pedidoId: orderId,
        productoId: it.productoId,
        nombre: it.nombre,
        imagen: it.imagen,
        cantidad: it.cantidad,
        precioUnitario: it.precioUnitario,
        subtotal: it.subtotal,
      }),
    );

    // 4. Calcular total final
    const totalFinal =
      Number(carrito.subtotal) - Number(carrito.descuentoCupon || 0) + costoEnvio;

    const nuevoPedido = this.pedidosRepo.create({
      id: orderId,
      nombreCliente: dto.nombre,
      apellidosCliente: dto.apellidos,
      correoElectronico: dto.correoElectronico,
      telefono: dto.telefono,
      tipoComprobante: dto.tipoComprobante,
      rutDocumento: dto.rutDocumento,
      tipoEntrega: dto.tipoEntrega,
      direccionEntrega: esDelivery ? direccionCompleta : undefined,
      sucursalRetiro: !esDelivery
        ? dto.sucursalRetiro || 'Av. Providencia 2556'
        : undefined,
      tiempoEstimadoEntrega: tiempoEstimado,
      metodoPago: dto.metodoPago,
      items: itemsPedido,
      subtotal: carrito.subtotal,
      costoEnvio,
      descuento: carrito.descuentoCupon,
      total: totalFinal,
      estadoPedido: 'Confirmado',
      fechaCreacion: new Date(),
    });

    const saved = await this.pedidosRepo.save(nuevoPedido);

    // 5. Vaciar el carrito tras compra exitosa
    await this.carritoService.cerrar(carritoId);

    return this.mapToDto(saved);
  }

  async findOne(id: string): Promise<GetPedidoDto> {
    const pedido = await this.pedidosRepo.findOne({
      where: { id },
      relations: { items: true },
    });
    if (!pedido) {
      throw new RecursoNoEncontradoError(
        `Pedido con orden ${id} no encontrado`,
      );
    }
    return this.mapToDto(pedido);
  }

  async getSeguimiento(id: string): Promise<SeguimientoPedidoDto> {
    const pedido = await this.findOne(id);

    return {
      numeroOrden: pedido.id,
      estadoActual: pedido.estadoPedido,
      historialPasos: [
        {
          paso: 'Recibido',
          completado: true,
          fecha: new Date(pedido.fechaCreacion).toISOString(),
        },
        {
          paso: 'En preparación',
          completado: true,
          fecha: new Date(pedido.fechaCreacion).toISOString(),
        },
        { paso: 'En camino', completado: false, fecha: null },
        { paso: 'Entregado', completado: false, fecha: null },
      ],
    };
  }

  private async generarNumeroOrden(): Promise<string> {
    let id: string;
    let exists = true;
    do {
      id = `ORD-${Date.now().toString().slice(-5)}${Math.floor(Math.random() * 90 + 10)}`;
      const found = await this.pedidosRepo.findOne({ where: { id } });
      exists = !!found;
    } while (exists);
    return id;
  }

  private mapToDto(pedido: Pedido): GetPedidoDto {
    return {
      id: pedido.id,
      nombreCliente: `${pedido.nombreCliente} ${pedido.apellidosCliente}`,
      correoElectronico: pedido.correoElectronico,
      telefono: pedido.telefono,
      modoEntrega:
        pedido.tipoEntrega === 'EnvioNormal' ? 'Delivery' : 'Retiro en tienda',
      tiempoEstimadoEntrega: pedido.tiempoEstimadoEntrega,
      direccionEntrega: pedido.direccionEntrega,
      sucursalRetiro: pedido.sucursalRetiro,
      items: (pedido.items || []).map((it) => ({
        productoId: it.productoId,
        nombre: it.nombre,
        imagen: it.imagen,
        cantidad: it.cantidad,
        precioUnitario: it.precioUnitario,
        subtotal: it.subtotal,
      })),
      subtotal: pedido.subtotal,
      costoEnvio: pedido.costoEnvio,
      descuento: pedido.descuento,
      total: pedido.total,
      estadoPedido: pedido.estadoPedido,
      fechaCreacion: pedido.fechaCreacion,
    };
  }
}
