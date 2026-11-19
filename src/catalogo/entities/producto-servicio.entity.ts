import { ApiProperty } from '@nestjs/swagger';
import { PrimaryColumn, Column } from 'typeorm';

export abstract class ProductoServicio {
  @ApiProperty({ description: 'Identificador único' })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({ description: 'Nombre del producto o servicio' })
  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @ApiProperty({ description: 'Tipo: Producto o Servicio' })
  @Column({ type: 'varchar', length: 30, default: 'Producto' })
  tipo: 'Producto' | 'Servicio';

  @ApiProperty({ description: 'Descripción detallada' })
  @Column({ type: 'text' })
  descripcion: string;

  @ApiProperty({ description: 'Marca o proveedor' })
  @Column({ type: 'varchar', length: 100 })
  marca: string;

  @ApiProperty({ description: 'Precio de venta' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (val: number) => val,
      from: (val: string | number) => Number(val),
    },
  })
  precio: number;

  @ApiProperty({
    description: 'Especie animal compatible (ej. Perro, Gato, Todos)',
    example: 'Perro',
  })
  @Column({ type: 'varchar', length: 50 })
  especie: string;

  @ApiProperty({
    description:
      'Rango de edad compatible (ej. Cachorro, Adulto, Senior, Todos)',
    example: 'Todos',
    required: false,
  })
  @Column({ name: 'rango_edad', type: 'varchar', length: 50, nullable: true })
  rangoEdad?: string;

  @ApiProperty({ description: 'Porcentaje de descuento (0 a 100)' })
  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
    transformer: {
      to: (val?: number) => val ?? 0,
      from: (val: string | number | null) => Number(val ?? 0),
    },
  })
  descuento: number;

  @ApiProperty({ description: 'Cantidad disponible' })
  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @ApiProperty({ description: 'Información de la ficha técnica' })
  @Column({ name: 'ficha_tecnica', type: 'text', nullable: true })
  fichaTecnica: string;
}
