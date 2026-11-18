import { Injectable } from '@nestjs/common';
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
  private pedidos: Pedido[] = [];

  constructor(
    private readonly carritoService: CarritoService,
    private readonly productosService: ProductosService,
  ) {}

  create(carritoId: string, dto: CreatePedidoDto): GetPedidoDto {
    if (!dto.aceptaTerminos) {
      throw new ReglaNegocioError(
        'Debes aceptar los términos y condiciones para continuar.',
      );
    }

    const carrito = this.carritoService.obtener(carritoId);

    if (carrito.items.length === 0) {
      throw new ReglaNegocioError('El carrito de compras está vacío.');
    }

    // 1. Validar y descontar stock de cada producto
    for (const item of carrito.items) {
      const producto = this.productosService.findOneEntity(item.productoId);
      if (producto.stock < item.cantidad) {
        throw new StockInsuficienteError(producto.stock, producto.nombre);
      }
    }

    for (const item of carrito.items) {
      this.productosService.decreaseStock(item.productoId, item.cantidad);
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
    const itemsPedido: ItemPedido[] = carrito.items.map((it) => ({
      productoId: it.productoId,
      nombre: it.nombre,
      imagen: it.imagen,
      cantidad: it.cantidad,
      precioUnitario: it.precioUnitario,
      subtotal: it.subtotal,
    }));

    // 4. Calcular total final
    const totalFinal = carrito.subtotal + costoEnvio;

    const nuevoPedido: Pedido = {
      id: this.generarNumeroOrden(),
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
    };

    this.pedidos.push(nuevoPedido);

    // 5. Vaciar el carrito tras compra exitosa
    this.carritoService.cerrar(carritoId);

    return this.mapToDto(nuevoPedido);
  }

  findOne(id: string): GetPedidoDto {
    const pedido = this.pedidos.find((p) => p.id === id);
    if (!pedido) {
      throw new RecursoNoEncontradoError(
        `Pedido con orden ${id} no encontrado`,
      );
    }
    return this.mapToDto(pedido);
  }

  getSeguimiento(id: string): SeguimientoPedidoDto {
    const pedido = this.findOne(id);

    return {
      numeroOrden: pedido.id,
      estadoActual: pedido.estadoPedido,
      historialPasos: [
        {
          paso: 'Recibido',
          completado: true,
          fecha: pedido.fechaCreacion.toISOString(),
        },
        {
          paso: 'En preparación',
          completado: true,
          fecha: pedido.fechaCreacion.toISOString(),
        },
        { paso: 'En camino', completado: false, fecha: null },
        { paso: 'Entregado', completado: false, fecha: null },
      ],
    };
  }

  private generarNumeroOrden(): string {
    let id: string;
    do {
      id = `ORD-${Date.now().toString().slice(-5)}${Math.floor(Math.random() * 90 + 10)}`;
    } while (this.pedidos.some((p) => p.id === id));
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
      items: pedido.items.map((it) => ({ ...it })),
      subtotal: pedido.subtotal,
      costoEnvio: pedido.costoEnvio,
      descuento: pedido.descuento,
      total: pedido.total,
      estadoPedido: pedido.estadoPedido,
      fechaCreacion: pedido.fechaCreacion,
    };
  }
}
