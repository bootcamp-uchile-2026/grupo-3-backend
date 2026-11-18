import { Entity, Column } from 'typeorm';
import { ProductoServicio } from './producto-servicio.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('productos')
export class Producto extends ProductoServicio {
  @ApiProperty({
    description: 'Código único de inventario (SKU)',
    example: '78796584755',
  })
  @Column({ type: 'varchar', length: 64, unique: true })
  sku: string;

  @ApiProperty({
    description: 'Stock actual disponible en inventario',
    example: 50,
  })
  @Column({ type: 'int', default: 0 })
  stock: number;

  @ApiProperty({
    description: 'Galería de imágenes del producto (URLs)',
    type: [String],
    example: ['https://example.com/foto1.jpg', 'https://example.com/foto2.jpg'],
  })
  @Column({ type: 'json' })
  imagenes: string[];

  @ApiProperty({
    description:
      'Categoría principal (ej. Alimento, Accesorio, Salud, Farmacia)',
    example: 'Salud y bienestar',
  })
  @Column({ type: 'varchar', length: 100 })
  categoria: string;

  @ApiProperty({
    description: 'Subcategoría del producto (ej. Platos y bebederos)',
    example: 'Platos y bebederos',
    required: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  subcategoria?: string;

  @ApiProperty({
    description:
      'Material de fabricación (ej. Acero, Cerámica, Plástico, Silicona)',
    example: 'Cerámica',
    required: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  material?: string;

  @ApiProperty({
    description: 'Precio original antes de descuentos (tachado)',
    example: 8990,
    required: false,
  })
  @Column({
    name: 'precio_original',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (val?: number) => val,
      from: (val: string | number | null) =>
        val !== null && val !== undefined ? Number(val) : undefined,
    },
  })
  precioOriginal?: number;

  @ApiProperty({
    description: 'Modo de uso o instrucciones de aplicación',
    example: 'Lavar con agua tibia antes del primer uso.',
    required: false,
  })
  @Column({ name: 'modo_de_uso', type: 'text', nullable: true })
  modoDeUso?: string;

  @ApiProperty({
    description: 'Especificaciones técnicas clave',
    example: {
      capacidad: '450 ml',
      medidas: '14 x 9',
      diseno: 'Elevado y ergonómico',
    },
    required: false,
  })
  @Column({ name: 'ficha_tecnica_detalle', type: 'json', nullable: true })
  fichaTecnicaDetalle?: Record<string, string>;

  @ApiProperty({
    description: 'Promedio de calificación en estrellas (1 a 5)',
    example: 4.0,
    default: 0,
  })
  @Column({
    name: 'calificacion_promedio',
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0,
    transformer: {
      to: (val?: number) => val ?? 0,
      from: (val: string | number | null) => Number(val ?? 0),
    },
  })
  calificacionPromedio: number;

  @ApiProperty({
    description: 'Cantidad total de reseñas de clientes',
    example: 59,
    default: 0,
  })
  @Column({ name: 'total_resenas', type: 'int', default: 0 })
  totalResenas: number;
}
