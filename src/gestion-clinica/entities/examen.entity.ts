import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrdenExamen } from './orden-examen.entity';

@Entity('examenes')
export class Examen {
  @ApiProperty({ description: 'Identificador único del examen' })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({
    description: 'Nombre o tipo de examen (ej. Hemograma, Ecografía)',
  })
  @Column({ name: 'nombre_examen', type: 'varchar', length: 150 })
  nombreExamen: string;

  @ApiProperty({
    description: 'Resultado en texto del examen',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  resultado?: string;

  @ApiProperty({ description: 'Estado del examen (ej. Pendiente, Completado)' })
  @Column({ type: 'varchar', length: 50, default: 'Pendiente' })
  estado: string;

  @ApiProperty({ description: 'ID de la orden de examen a la que pertenece' })
  @Column({ name: 'orden_id', type: 'varchar', length: 64 })
  ordenId: string;

  @ManyToOne(() => OrdenExamen, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orden_id' })
  orden?: OrdenExamen;
}
