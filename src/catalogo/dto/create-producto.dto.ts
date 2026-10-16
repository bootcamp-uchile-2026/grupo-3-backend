import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Comedero elevado estilo gatitos 450 ml.',
  })
  nombre: string;

  @ApiProperty({
    description: 'Código de inventario (SKU)',
    example: '78796584755',
  })
  sku: string;

  @ApiProperty({ description: 'Precio del producto', example: 7490 })
  precio: number;

  @ApiProperty({
    description: 'Precio original de referencia antes de descuento',
    example: 8990,
    required: false,
  })
  precioOriginal?: number;

  @ApiProperty({ description: 'Stock inicial disponible en inventario', example: 50 })
  stock: number;

  @ApiProperty({
    description: 'Galería de imágenes del producto (mínimo una para la portada)',
    type: [String],
    example: [
      'https://example.com/comedero-principal.jpg',
      'https://example.com/comedero-lateral.jpg',
    ],
  })
  imagenes: string[];

  @ApiProperty({ description: 'Marca o fabricante', example: 'Catit' })
  marca: string;

  @ApiProperty({
    description: 'Categoría principal del producto',
    example: 'Salud y bienestar',
  })
  categoria: string;

  @ApiProperty({
    description: 'Subcategoría del producto',
    example: 'Platos y bebederos',
    required: false,
  })
  subcategoria?: string;

  @ApiProperty({
    description: 'Especie compatible (ej. Gato, Perro, Aves, Reptiles, Roedores, Todos)',
    example: 'Gato',
  })
  especie: string;

  @ApiProperty({
    description: 'Etapa de vida recomendada (ej. En crecimiento, Adulta, Senior, Todos)',
    example: 'Adulta',
    required: false,
  })
  rangoEdad?: string;

  @ApiProperty({
    description: 'Material de fabricación (ej. Acero, Cerámica, Plástico, Silicona)',
    example: 'Cerámica',
    required: false,
  })
  material?: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Comedero elevado compacto de 450 ml para favorecer una postura saludable.',
  })
  descripcion: string;

  @ApiProperty({
    description: 'Porcentaje o monto de descuento',
    example: 10,
    required: false,
  })
  descuento?: number;

  @ApiProperty({
    description: 'Cantidad en empaque / unidades',
    example: 1,
    required: false,
  })
  cantidad?: number;

  @ApiProperty({
    description: 'Ficha técnica en texto',
    example: 'Capacidad: 450 ml. Medidas: 14x9 cm.',
    required: false,
  })
  fichaTecnica?: string;

  @ApiProperty({
    description: 'Instrucciones o modo de uso',
    example: 'Lavar con agua tibia y jabón neutro.',
    required: false,
  })
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
  fichaTecnicaDetalle?: Record<string, string>;
}
