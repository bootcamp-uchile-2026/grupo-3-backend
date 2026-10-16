import { ApiProperty } from '@nestjs/swagger';

export class ItemPedido {
  @ApiProperty({ description: 'ID del producto' })
  productoId: string;

  @ApiProperty({ description: 'Nombre del producto' })
  nombre: string;

  @ApiProperty({ description: 'Imagen del producto' })
  imagen: string;

  @ApiProperty({ description: 'Cantidad comprada' })
  cantidad: number;

  @ApiProperty({ description: 'Precio unitario pagado' })
  precioUnitario: number;

  @ApiProperty({ description: 'Subtotal del producto' })
  subtotal: number;
}

export class Pedido {
  @ApiProperty({ description: 'Número de orden / ID del pedido', example: 'ORD-12345' })
  id: string;

  @ApiProperty({ description: 'ID del usuario registrado', required: false })
  usuarioId?: string;

  @ApiProperty({ description: 'Nombre del comprador', example: 'Juan' })
  nombreCliente: string;

  @ApiProperty({ description: 'Apellidos del comprador', example: 'Pérez' })
  apellidosCliente: string;

  @ApiProperty({ description: 'Correo electrónico de confirmación', example: 'juan.perez@example.com' })
  correoElectronico: string;

  @ApiProperty({ description: 'Teléfono de contacto', example: '+56912345678' })
  telefono: string;

  @ApiProperty({ description: 'Tipo de comprobante tributario', example: 'Boleta' })
  tipoComprobante: 'Boleta' | 'Factura';

  @ApiProperty({ description: 'RUT o documento', example: '12.345.678-9' })
  rutDocumento: string;

  @ApiProperty({ description: 'Modo de entrega', example: 'EnvioNormal' })
  tipoEntrega: 'EnvioNormal' | 'RetiroEnTienda';

  @ApiProperty({ description: 'Dirección completa de entrega', required: false })
  direccionEntrega?: string;

  @ApiProperty({ description: 'Sucursal de retiro si aplica', required: false })
  sucursalRetiro?: string;

  @ApiProperty({ description: 'Plazo estimado de entrega', example: '2 a 3 días hábiles' })
  tiempoEstimadoEntrega: string;

  @ApiProperty({ description: 'Método de pago utilizado', example: 'WebpayPlus' })
  metodoPago: 'MercadoPago' | 'Tarjeta' | 'WebpayPlus';

  @ApiProperty({ description: 'Lista de productos comprados', type: [ItemPedido] })
  items: ItemPedido[];

  @ApiProperty({ description: 'Subtotal de la orden' })
  subtotal: number;

  @ApiProperty({ description: 'Costo de envío aplicado (3990 o 0)' })
  costoEnvio: number;

  @ApiProperty({ description: 'Descuento total por cupón' })
  descuento: number;

  @ApiProperty({ description: 'Monto total pagado' })
  total: number;

  @ApiProperty({
    description: 'Estado actual del pedido',
    example: 'Confirmado',
    enum: ['Confirmado', 'EnPreparacion', 'EnCamino', 'ListoParaRetiro', 'Entregado'],
  })
  estadoPedido: 'Confirmado' | 'EnPreparacion' | 'EnCamino' | 'ListoParaRetiro' | 'Entregado';

  @ApiProperty({ description: 'Fecha y hora de creación de la compra' })
  fechaCreacion: Date;
}
