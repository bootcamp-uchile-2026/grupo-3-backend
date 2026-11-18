import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

// ===== DTOs de entrada (validados) =====

export class AgregarAlCarritoDto {
  @ApiProperty({
    description: 'ID del producto a agregar',
    example: 'prod-123',
  })
  @IsString({ message: 'El ID del producto debe ser un texto' })
  @IsNotEmpty({ message: 'El ID del producto no puede estar vacío' })
  productoId: string;

  @ApiPropertyOptional({
    description: 'Cantidad a añadir',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  cantidad?: number;
}

export class ActualizarCantidadItemDto {
  @ApiProperty({ description: 'Nueva cantidad del producto', example: 2 })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  cantidad: number;
}

export class AplicarCuponDto {
  @ApiProperty({
    description: 'Código del cupón promocional',
    example: 'PETLOVE10',
  })
  @IsString({ message: 'El código del cupón debe ser un texto' })
  @IsNotEmpty({ message: 'El código del cupón no puede estar vacío' })
  codigoCupon: string;
}

// ===== DTOs de respuesta (no se validan) =====

export class ItemCarritoDto {
  @ApiProperty({ description: 'ID del producto', example: 'prod-123' })
  productoId: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Comedero elevado estilo gatitos 450 ml.',
  })
  nombre: string;

  @ApiPropertyOptional({ description: 'Marca del producto', example: 'Catit' })
  marca?: string;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/comedero.jpg',
  })
  imagen: string;

  @ApiPropertyOptional({
    description: 'Precio original tachado',
    example: 8990,
  })
  precioOriginal?: number;

  @ApiProperty({ description: 'Precio unitario final', example: 7490 })
  precioUnitario: number;

  @ApiProperty({ description: 'Cantidad seleccionada', example: 2 })
  cantidad: number;

  @ApiProperty({ description: 'Subtotal del producto', example: 14980 })
  subtotal: number;
}

export class GetCarritoDto {
  @ApiProperty({
    description:
      'ID único del carrito. Front debe guardarlo para las siguientes llamadas',
    example: '3f2a9c1e-5b7d-4e8a-9c21-7d4e5f6a8b90',
  })
  id: string;

  @ApiProperty({
    description: 'Lista de ítems en el carrito',
    type: [ItemCarritoDto],
  })
  items: ItemCarritoDto[];

  @ApiProperty({
    description:
      'Total de artículos acumulados (título "Carrito de compras (5 artículos)")',
    example: 5,
  })
  totalArticulos: number;

  @ApiProperty({ description: 'Subtotal de la compra', example: 29960 })
  subtotal: number;

  @ApiPropertyOptional({
    description: 'Cupón aplicado actualmente',
    example: 'PETLOVE10',
  })
  cuponAplicado?: string;

  @ApiPropertyOptional({
    description: 'Descuento total por cupón',
    example: 3000,
  })
  descuentoCupon?: number;

  @ApiProperty({ description: 'Total final a pagar', example: 29960 })
  total: number;
}
