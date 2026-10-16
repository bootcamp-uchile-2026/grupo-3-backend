import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

// ===== DTO de entrada (validado) =====

export class CreatePedidoDto {
  @ApiProperty({ description: 'Nombre del comprador', example: 'Juan' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos del comprador', example: 'Pérez' })
  @IsString({ message: 'Los apellidos deben ser un texto' })
  @Length(2, 50, { message: 'Los apellidos deben tener entre 2 y 50 caracteres' })
  apellidos: string;

  @ApiProperty({
    description: 'Dirección de correo electrónico de confirmación',
    example: 'juan.perez@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico debe ser un email válido' })
  correoElectronico: string;

  @ApiProperty({ description: 'Número de teléfono de contacto', example: '+56912345678' })
  @IsString({ message: 'El teléfono debe ser un texto' })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  telefono: string;

  @ApiProperty({
    description: 'Tipo de comprobante tributario',
    enum: ['Boleta', 'Factura'],
    example: 'Boleta',
  })
  @IsIn(['Boleta', 'Factura'], { message: 'El tipo de comprobante debe ser Boleta o Factura' })
  tipoComprobante: 'Boleta' | 'Factura';

  @ApiProperty({ description: 'RUT o documento de identidad', example: '12.345.678-9' })
  @IsString({ message: 'El RUT o documento debe ser un texto' })
  @IsNotEmpty({ message: 'El RUT o documento no puede estar vacío' })
  rutDocumento: string;

  @ApiProperty({
    description: 'Modalidad de entrega elegida',
    enum: ['EnvioNormal', 'RetiroEnTienda'],
    example: 'EnvioNormal',
  })
  @IsIn(['EnvioNormal', 'RetiroEnTienda'], {
    message: 'El tipo de entrega debe ser EnvioNormal o RetiroEnTienda',
  })
  tipoEntrega: 'EnvioNormal' | 'RetiroEnTienda';

  // Si es despacho a domicilio:
  @ApiPropertyOptional({ description: 'ID de dirección guardada si el usuario tiene sesión', example: 'dir-123' })
  @IsOptional()
  @IsString({ message: 'El ID de la dirección debe ser un texto' })
  direccionId?: string;

  @ApiPropertyOptional({ description: 'Región de entrega', example: 'Metropolitana' })
  @ValidateIf((o: CreatePedidoDto) => o.tipoEntrega === 'EnvioNormal' && !o.direccionId)
  @IsString({ message: 'La región es obligatoria para el envío a domicilio' })
  @IsNotEmpty({ message: 'La región es obligatoria para el envío a domicilio' })
  region?: string;

  @ApiPropertyOptional({ description: 'Comuna de entrega', example: 'Maipú' })
  @ValidateIf((o: CreatePedidoDto) => o.tipoEntrega === 'EnvioNormal' && !o.direccionId)
  @IsString({ message: 'La comuna es obligatoria para el envío a domicilio' })
  @IsNotEmpty({ message: 'La comuna es obligatoria para el envío a domicilio' })
  comuna?: string;

  @ApiPropertyOptional({ description: 'Calle y número', example: 'Av. Pajarito 3234' })
  @ValidateIf((o: CreatePedidoDto) => o.tipoEntrega === 'EnvioNormal' && !o.direccionId)
  @IsString({ message: 'La dirección es obligatoria para el envío a domicilio' })
  @IsNotEmpty({ message: 'La dirección es obligatoria para el envío a domicilio' })
  direccion?: string;

  @ApiPropertyOptional({ description: 'Número de departamento u oficina', example: 'piso 5, depto 506' })
  @IsOptional()
  @IsString({ message: 'El departamento u oficina debe ser un texto' })
  departamentoOficina?: string;

  @ApiPropertyOptional({ description: 'Referencia para el repartidor', example: 'Portón negro' })
  @IsOptional()
  @IsString({ message: 'La referencia debe ser un texto' })
  referencia?: string;

  // Si es retiro en tienda:
  @ApiPropertyOptional({ description: 'Sucursal de retiro', example: 'Av. Providencia 2556' })
  @ValidateIf((o: CreatePedidoDto) => o.tipoEntrega === 'RetiroEnTienda')
  @IsString({ message: 'La sucursal de retiro es obligatoria para el retiro en tienda' })
  @IsNotEmpty({ message: 'La sucursal de retiro es obligatoria para el retiro en tienda' })
  sucursalRetiro?: string;

  @ApiProperty({
    description: 'Método de pago seleccionado',
    enum: ['MercadoPago', 'Tarjeta', 'WebpayPlus'],
    example: 'WebpayPlus',
  })
  @IsIn(['MercadoPago', 'Tarjeta', 'WebpayPlus'], {
    message: 'El método de pago debe ser MercadoPago, Tarjeta o WebpayPlus',
  })
  metodoPago: 'MercadoPago' | 'Tarjeta' | 'WebpayPlus';

  @ApiProperty({
    description: 'Aceptación obligatoria de términos y condiciones',
    example: true,
  })
  @IsBoolean({ message: 'La aceptación de términos debe ser verdadero o falso' })
  @Equals(true, { message: 'Debe aceptar los términos y condiciones' })
  aceptaTerminos: boolean;

  @ApiPropertyOptional({ description: 'ID del usuario registrado', example: 'duenio-123' })
  @IsOptional()
  @IsString({ message: 'El ID del usuario debe ser un texto' })
  usuarioId?: string;
}

// ===== DTOs de respuesta (no se validan) =====

export class ItemPedidoDto {
  @ApiProperty({ description: 'ID del producto', example: 'prod-123' })
  productoId: string;

  @ApiProperty({ description: 'Nombre del producto', example: 'Comedero elevado estilo gatitos 450 ml.' })
  nombre: string;

  @ApiProperty({ description: 'Imagen del producto', example: 'https://example.com/comedero.jpg' })
  imagen: string;

  @ApiProperty({ description: 'Cantidad comprada', example: 2 })
  cantidad: number;

  @ApiProperty({ description: 'Precio unitario pagado', example: 7490 })
  precioUnitario: number;

  @ApiProperty({ description: 'Subtotal del ítem', example: 14980 })
  subtotal: number;
}

export class GetPedidoDto {
  @ApiProperty({ description: 'Número de orden / ID del pedido', example: 'ORD-12345' })
  id: string;

  @ApiPropertyOptional({ description: 'ID del usuario registrado', example: 'duenio-123' })
  usuarioId?: string;

  @ApiProperty({ description: 'Nombre y apellido del cliente', example: 'Juan Pérez' })
  nombreCliente: string;

  @ApiProperty({ description: 'Correo de confirmación', example: 'juan.perez@example.com' })
  correoElectronico: string;

  @ApiProperty({ description: 'Teléfono', example: '+56912345678' })
  telefono: string;

  @ApiProperty({ description: 'Modo de entrega', example: 'Delivery' })
  modoEntrega: string;

  @ApiProperty({ description: 'Plazo estimado de entrega', example: '2 a 3 días hábiles' })
  tiempoEstimadoEntrega: string;

  @ApiPropertyOptional({ description: 'Dirección de despacho si aplica', example: 'Av. Pajarito 3234, Maipú' })
  direccionEntrega?: string;

  @ApiPropertyOptional({ description: 'Sucursal de retiro si aplica', example: 'Av. Providencia 2556' })
  sucursalRetiro?: string;

  @ApiProperty({ description: 'Lista de artículos comprados', type: [ItemPedidoDto] })
  items: ItemPedidoDto[];

  @ApiProperty({ description: 'Subtotal de la compra', example: 29960 })
  subtotal: number;

  @ApiProperty({ description: 'Costo de envío aplicado', example: 3990 })
  costoEnvio: number;

  @ApiProperty({ description: 'Descuento por cupón', example: 0 })
  descuento: number;

  @ApiProperty({ description: 'Total final pagado', example: 33950 })
  total: number;

  @ApiProperty({ description: 'Estado del pedido', example: 'Confirmado' })
  estadoPedido: string;

  @ApiProperty({ description: 'Fecha de creación' })
  fechaCreacion: Date;
}

export class SeguimientoPedidoDto {
  @ApiProperty({ description: 'Número de orden', example: 'ORD-12345' })
  numeroOrden: string;

  @ApiProperty({ description: 'Estado actual', example: 'EnCamino' })
  estadoActual: string;

  @ApiProperty({
    description: 'Historial de pasos de seguimiento',
    example: [
      { paso: 'Recibido', completado: true, fecha: '2026-10-05T20:00:00Z' },
      { paso: 'En preparación', completado: true, fecha: '2026-10-06T09:00:00Z' },
      { paso: 'En camino', completado: false, fecha: null },
      { paso: 'Entregado', completado: false, fecha: null },
    ],
  })
  historialPasos: { paso: string; completado: boolean; fecha: string | null }[];
}
