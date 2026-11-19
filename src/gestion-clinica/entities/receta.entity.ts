import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ConsultaClinica } from './consulta.entity';

@Entity('recetas')
export class Receta {
  @ApiProperty({ description: 'Identificador de la receta' })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({ description: 'Dosis del medicamento o producto' })
  @Column({ type: 'varchar', length: 150 })
  dosis: string;

  @ApiProperty({ description: 'Frecuencia de administración' })
  @Column({ type: 'varchar', length: 150 })
  frecuencia: string;

  @ApiProperty({ description: 'Duración del tratamiento' })
  @Column({ type: 'varchar', length: 150 })
  duracion: string;

  @ApiProperty({ description: 'Fecha de emisión de la receta' })
  @Column({ name: 'fecha_emision', type: 'datetime' })
  fechaEmision: Date;

  @ApiProperty({ description: 'ID de la consulta a la que pertenece' })
  @Column({ name: 'consulta_id', type: 'varchar', length: 64 })
  consultaId: string;

  @ManyToOne(() => ConsultaClinica, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'consulta_id' })
  consulta?: ConsultaClinica;

  @ApiProperty({
    description: 'Lista de IDs de productos prescritos',
    type: [String],
  })
  @Column({ name: 'productos_prescritos_ids', type: 'json' })
  productosPrescritosIds: string[];
}
