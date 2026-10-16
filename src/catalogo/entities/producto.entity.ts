import { ProductoServicio } from './producto-servicio.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Producto extends ProductoServicio {
  @ApiProperty({ description: 'Código único de inventario (SKU)', example: '78796584755' })
  sku: string;

  @ApiProperty({ description: 'Stock actual disponible en inventario', example: 50 })
  stock: number;

  @ApiProperty({
    description: 'Galería de imágenes del producto (URLs)',
    type: [String],
    example: ['https://example.com/foto1.jpg', 'https://example.com/foto2.jpg'],
  })
  imagenes: string[];

  @ApiProperty({
    description: 'Categoría principal (ej. Alimento, Accesorio, Salud, Farmacia)',
    example: 'Salud y bienestar',
  })
  categoria: string;

  @ApiProperty({
    description: 'Subcategoría del producto (ej. Platos y bebederos)',
    example: 'Platos y bebederos',
    required: false,
  })
  subcategoria?: string;

  @ApiProperty({
    description: 'Material de fabricación (ej. Acero, Cerámica, Plástico, Silicona)',
    example: 'Cerámica',
    required: false,
  })
  material?: string;

  @ApiProperty({
    description: 'Precio original antes de descuentos (tachado)',
    example: 8990,
    required: false,
  })
  precioOriginal?: number;

  @ApiProperty({
    description: 'Modo de uso o instrucciones de aplicación',
    example: 'Lavar con agua tibia antes del primer uso.',
    required: false,
  })
  modoDeUso?: string;

  @ApiProperty({
    description: 'Especificaciones técnicas clave',
    example: { capacidad: '450 ml', medidas: '14 x 9', diseno: 'Elevado y ergonómico' },
    required: false,
  })
  fichaTecnicaDetalle?: Record<string, string>;

  @ApiProperty({
    description: 'Promedio de calificación en estrellas (1 a 5)',
    example: 4.0,
    default: 0,
  })
  calificacionPromedio: number;

  @ApiProperty({
    description: 'Cantidad total de reseñas de clientes',
    example: 59,
    default: 0,
  })
  totalResenas: number;
}
