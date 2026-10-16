import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Comedero elevado estilo gatitos 450 ml.',
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({
    description: 'Código de inventario (SKU)',
    example: '78796584755',
  })
  @IsString({ message: 'El SKU debe ser un texto' })
  @IsNotEmpty({ message: 'El SKU no puede estar vacío' })
  sku: string;

  @ApiProperty({ description: 'Precio del producto', example: 7490 })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio: number;

  @ApiProperty({
    description: 'Precio original de referencia antes de descuento',
    example: 8990,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio original debe ser un número' })
  @Min(0, { message: 'El precio original no puede ser negativo' })
  precioOriginal?: number;

  @ApiProperty({ description: 'Stock inicial disponible en inventario', example: 50 })
  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @ApiProperty({
    description: 'Galería de imágenes del producto (mínimo una para la portada)',
    type: [String],
    example: [
      'https://example.com/comedero-principal.jpg',
      'https://example.com/comedero-lateral.jpg',
    ],
  })
  @IsArray({ message: 'Las imágenes deben ser una lista' })
  @IsString({ each: true, message: 'Cada imagen debe ser una URL en texto' })
  imagenes: string[];

  @ApiProperty({ description: 'Marca o fabricante', example: 'Catit' })
  @IsString({ message: 'La marca debe ser un texto' })
  @IsNotEmpty({ message: 'La marca no puede estar vacía' })
  marca: string;

  @ApiProperty({
    description: 'Categoría principal del producto',
    example: 'Salud y bienestar',
  })
  @IsString({ message: 'La categoría debe ser un texto' })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  categoria: string;

  @ApiProperty({
    description: 'Subcategoría del producto',
    example: 'Platos y bebederos',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La subcategoría debe ser un texto' })
  subcategoria?: string;

  @ApiProperty({
    description: 'Especie compatible (ej. Gato, Perro, Aves, Reptiles, Roedores, Todos)',
    example: 'Gato',
  })
  @IsString({ message: 'La especie debe ser un texto' })
  @IsNotEmpty({ message: 'La especie no puede estar vacía' })
  especie: string;

  @ApiProperty({
    description: 'Etapa de vida recomendada (ej. En crecimiento, Adulta, Senior, Todos)',
    example: 'Adulta',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El rango de edad debe ser un texto' })
  rangoEdad?: string;

  @ApiProperty({
    description: 'Material de fabricación (ej. Acero, Cerámica, Plástico, Silicona)',
    example: 'Cerámica',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El material debe ser un texto' })
  material?: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Comedero elevado compacto de 450 ml para favorecer una postura saludable.',
  })
  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  descripcion: string;

  @ApiProperty({
    description: 'Porcentaje o monto de descuento',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El descuento debe ser un número' })
  @Min(0, { message: 'El descuento no puede ser negativo' })
  descuento?: number;

  @ApiProperty({
    description: 'Cantidad en empaque / unidades',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  cantidad?: number;

  @ApiProperty({
    description: 'Ficha técnica en texto',
    example: 'Capacidad: 450 ml. Medidas: 14x9 cm.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La ficha técnica debe ser un texto' })
  fichaTecnica?: string;

  @ApiProperty({
    description: 'Instrucciones o modo de uso',
    example: 'Lavar con agua tibia y jabón neutro.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El modo de uso debe ser un texto' })
  modoDeUso?: string;

  @ApiProperty({
    description: 'Detalle estructurado de ficha técnica',
    example: {
      capacidad: '450 ml',
      medidas: '14 x 9',
      materiales: 'Plástico y acero',
      diseno: 'Elevado y ergonómico',
    },
    required: false,
  })
  @IsOptional()
  @IsObject({ message: 'El detalle de ficha técnica debe ser un objeto' })
  fichaTecnicaDetalle?: Record<string, string>;
}
