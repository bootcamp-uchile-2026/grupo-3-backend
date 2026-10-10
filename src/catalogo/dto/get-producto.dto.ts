import { ApiProperty } from '@nestjs/swagger';

export class GetProductoDto {
  @ApiProperty({
    description: 'Identificador único del producto',
    example: 'prod-abc',
  })
  id: string;

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

  @ApiProperty({
    description: 'Tipo de ítem: Producto',
    example: 'Producto',
  })
  tipo: 'Producto' | 'Servicio';

  @ApiProperty({
    description: 'Descripción detallada',
    example: 'Comedero elevado compacto de 450 ml para favorecer una postura saludable.',
  })
  descripcion: string;

  @ApiProperty({ description: 'Marca', example: 'Catit' })
  marca: string;

  @ApiProperty({ description: 'Precio de venta final', example: 7490 })
  precio: number;

  @ApiProperty({
    description: 'Precio original de referencia antes de descuento (tachado)',
    example: 8990,
    required: false,
  })
  precioOriginal?: number;

  @ApiProperty({
    description: 'Stock disponible en inventario',
    example: 50,
  })
  stock: number;

  @ApiProperty({
    description: 'Galería de imágenes',
    type: [String],
    example: ['https://example.com/foto1.jpg', 'https://example.com/foto2.jpg'],
  })
  imagenes: string[];

  @ApiProperty({
    description: 'Categoría principal',
    example: 'Salud y bienestar',
  })
  categoria: string;

  @ApiProperty({
    description: 'Subcategoría',
    example: 'Platos y bebederos',
    required: false,
  })
  subcategoria?: string;

  @ApiProperty({
    description: 'Especie compatible',
    example: 'Gato',
  })
  especie: string;

  @ApiProperty({
    description: 'Etapa de vida recomendada',
    example: 'Adulta',
    required: false,
  })
  rangoEdad?: string;

  @ApiProperty({
    description: 'Material de fabricación',
    example: 'Cerámica',
    required: false,
  })
  material?: string;

  @ApiProperty({
    description: 'Descuento aplicable',
    example: 10,
    required: false,
  })
  descuento?: number;

  @ApiProperty({
    description: 'Cantidad en empaque',
    example: 1,
    required: false,
  })
  cantidad?: number;

  @ApiProperty({
    description: 'Ficha técnica en texto',
    example: 'Capacidad: 450 ml.',
    required: false,
  })
  fichaTecnica?: string;

  @ApiProperty({
    description: 'Modo de uso o instrucciones',
    example: 'Lavar con agua tibia antes del primer uso.',
    required: false,
  })
  modoDeUso?: string;

  @ApiProperty({
    description: 'Especificaciones técnicas estructuradas',
    example: { capacidad: '450 ml', medidas: '14 x 9' },
    required: false,
  })
  fichaTecnicaDetalle?: Record<string, string>;

  @ApiProperty({
    description: 'Calificación promedio en estrellas (1 a 5)',
    example: 4.0,
  })
  calificacionPromedio: number;

  @ApiProperty({
    description: 'Cantidad total de reseñas recibidas',
    example: 59,
  })
  totalResenas: number;
}
