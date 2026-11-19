import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('pedidos')
export class Pedido {
  @ApiProperty({
    description: 'Número de orden / ID del pedido',
    example: 'ORD-12345',
  })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({ description: 'ID del usuario comprador', required: false })
  @Column({ name: 'usuario_id', type: 'varchar', length: 64, nullable: true })
  usuarioId?: string;

  @ApiProperty({ description: 'Nombre del comprador', example: 'Juan' })
  @Column({ name: 'nombre_cliente', type: 'varchar', length: 100 })
  nombreCliente: string;

  @ApiProperty({ description: 'Apellidos del comprador', example: 'Pérez' })
  @Column({ name: 'apellidos_cliente', type: 'varchar', length: 100 })
  apellidosCliente: string;

  @ApiProperty({
    description: 'Correo electrónico de confirmación',
    example: 'juan.perez@example.com',
  })
  @Column({ name: 'correo_electronico', type: 'varchar', length: 150 })
  correoElectronico: string;

  @ApiProperty({ description: 'Teléfono de contacto', example: '+56912345678' })
  @Column({ type: 'varchar', length: 30 })
  telefono: string;

  @ApiProperty({
    description: 'Tipo de comprobante tributario',
    example: 'Boleta',
  })
  @Column({ name: 'tipo_comprobante', type: 'varchar', length: 20 })
  tipoComprobante: 'Boleta' | 'Factura';

  @ApiProperty({ description: 'RUT o documento', example: '12.345.678-9' })
  @Column({ name: 'rut_documento', type: 'varchar', length: 30 })
  rutDocumento: string;

  @ApiProperty({ description: 'Modo de entrega', example: 'EnvioNormal' })
  @Column({ name: 'tipo_entrega', type: 'varchar', length: 30 })
  tipoEntrega: 'EnvioNormal' | 'RetiroEnTienda';

  @ApiProperty({
    description: 'Dirección completa de entrega',
    required: false,
  })
  @Column({ name: 'direccion_entrega', type: 'varchar', length: 500, nullable: true })
  direccionEntrega?: string;

  @ApiProperty({ description: 'Sucursal de retiro si aplica', required: false })
  @Column({ name: 'sucursal_retiro', type: 'varchar', length: 200, nullable: true })
  sucursalRetiro?: string;

  @ApiProperty({
    description: 'Plazo estimado de entrega',
    example: '2 a 3 días hábiles',
  })
  @Column({ name: 'tiempo_estimado_entrega', type: 'varchar', length: 100 })
  tiempoEstimadoEntrega: string;

  @ApiProperty({
    description: 'Método de pago utilizado',
    example: 'WebpayPlus',
  })
  @Column({ name: 'metodo_pago', type: 'varchar', length: 30 })
  metodoPago: 'MercadoPago' | 'Tarjeta' | 'WebpayPlus';

  @ApiProperty({
    description: 'Lista de productos comprados',
    type: () => [ItemPedido],
  })
  @OneToMany(() => ItemPedido, (item) => item.pedido, {
    cascade: true,
    eager: true,
  })
  items: ItemPedido[];

  @ApiProperty({ description: 'Subtotal de la orden' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (val: number) => val,
      from: (val: string | number) => Number(val),
    },
  })
  subtotal: number;

  @ApiProperty({ description: 'Costo de envío aplicado (3990 o 0)' })
  @Column({
    name: 'costo_envio',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (val: number) => val,
      from: (val: string | number) => Number(val),
    },
  })
  costoEnvio: number;

  @ApiProperty({ description: 'Descuento total por cupón' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: {
      to: (val?: number) => val ?? 0,
      from: (val: string | number | null) => Number(val ?? 0),
    },
  })
  descuento: number;

  @ApiProperty({ description: 'Monto total pagado' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (val: number) => val,
      from: (val: string | number) => Number(val),
    },
  })
  total: number;

  @ApiProperty({
    description: 'Estado actual del pedido',
    example: 'Confirmado',
    enum: [
      'Confirmado',
      'EnPreparacion',
      'EnCamino',
      'ListoParaRetiro',
      'Entregado',
    ],
  })
  @Column({ name: 'estado_pedido', type: 'varchar', length: 30, default: 'Confirmado' })
  estadoPedido:
    | 'Confirmado'
    | 'EnPreparacion'
    | 'EnCamino'
    | 'ListoParaRetiro'
    | 'Entregado';

  @ApiProperty({ description: 'Fecha y hora de creación de la compra' })
  @Column({ name: 'fecha_creacion', type: 'datetime' })
  fechaCreacion: Date;
}

@Entity('pedido_items')
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'pedido_id', type: 'varchar', length: 64, nullable: true })
  pedidoId?: string;

  @ManyToOne(() => Pedido, (pedido) => pedido.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pedido_id' })
  pedido?: Pedido;

  @ApiProperty({ description: 'ID del producto' })
  @Column({ name: 'producto_id', type: 'varchar', length: 64 })
  productoId: string;

  @ApiProperty({ description: 'Nombre del producto' })
  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @ApiProperty({ description: 'Imagen del producto' })
  @Column({ type: 'varchar', length: 500, default: '' })
  imagen: string;

  @ApiProperty({ description: 'Cantidad comprada' })
  @Column({ type: 'int' })
  cantidad: number;

  @ApiProperty({ description: 'Precio unitario pagado' })
  @Column({
    name: 'precio_unitario',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (val: number) => val,
      from: (val: string | number) => Number(val),
    },
  })
  precioUnitario: number;

  @ApiProperty({ description: 'Subtotal del producto' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (val: number) => val,
      from: (val: string | number) => Number(val),
    },
  })
  subtotal: number;
}
