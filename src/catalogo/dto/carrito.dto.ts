import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AgregarAlCarritoDto {
  @ApiProperty({ description: 'ID del producto a agregar', example: 'prod-123' })
  productoId: string;

  @ApiProperty({ description: 'Cantidad a añadir', example: 1, default: 1 })
  cantidad: number;

  @ApiPropertyOptional({ description: 'ID del usuario si está autenticado', example: 'duenio-123' })
  usuarioId?: string;
}

export class ActualizarCantidadItemDto {
  @ApiProperty({ description: 'Nueva cantidad del producto', example: 2 })
  cantidad: number;

  @ApiPropertyOptional({ description: 'ID del usuario si está autenticado', example: 'duenio-123' })
  usuarioId?: string;
}

export class AplicarCuponDto {
  @ApiProperty({ description: 'Código del cupón promocional', example: 'PETLOVE10' })
  codigoCupon: string;

  @ApiPropertyOptional({ description: 'ID del usuario si está autenticado', example: 'duenio-123' })
  usuarioId?: string;
}

export class ItemCarritoDto {
  @ApiProperty({ description: 'ID del producto', example: 'prod-123' })
  productoId: string;

  @ApiProperty({ description: 'Nombre del producto', example: 'Comedero elevado estilo gatitos 450 ml.' })
  nombre: string;

  @ApiPropertyOptional({ description: 'Marca del producto', example: 'Catit' })
  marca?: string;

  @ApiProperty({ description: 'URL de la imagen del producto', example: 'https://example.com/comedero.jpg' })
  imagen: string;

  @ApiPropertyOptional({ description: 'Precio original tachado', example: 8990 })
  precioOriginal?: number;

  @ApiProperty({ description: 'Precio unitario final', example: 7490 })
  precioUnitario: number;

  @ApiProperty({ description: 'Cantidad seleccionada', example: 2 })
  cantidad: number;

  @ApiProperty({ description: 'Subtotal del producto', example: 14980 })
  subtotal: number;
}

export class GetCarritoDto {
  @ApiProperty({ description: 'ID único del carrito', example: 'cart-123' })
  id: string;

  @ApiPropertyOptional({ description: 'ID del usuario', example: 'duenio-123' })
  usuarioId?: string;

  @ApiProperty({ description: 'Lista de ítems en el carrito', type: [ItemCarritoDto] })
  items: ItemCarritoDto[];

  @ApiProperty({ description: 'Total de artículos acumulados (título "Carrito de compras (5 artículos)")', example: 5 })
  totalArticulos: number;

  @ApiProperty({ description: 'Subtotal de la compra', example: 29960 })
  subtotal: number;

  @ApiPropertyOptional({ description: 'Cupón aplicado actualmente', example: 'PETLOVE10' })
  cuponAplicado?: string;

  @ApiPropertyOptional({ description: 'Descuento total por cupón', example: 3000 })
  descuentoCupon?: number;

  @ApiProperty({ description: 'Total final a pagar', example: 29960 })
  total: number;
}
