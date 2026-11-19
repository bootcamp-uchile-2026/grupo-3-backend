import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ConsultaClinica } from './consulta.entity';

@Entity('ordenes_examen')
export class OrdenExamen {
  @ApiProperty({ description: 'Identificador único de la orden de examen' })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({ description: 'Fecha de emisión de la orden' })
  @Column({ name: 'fecha_emision', type: 'datetime' })
  fechaEmision: Date;

  @ApiProperty({ description: 'ID de la consulta a la que pertenece la orden' })
  @Column({ name: 'consulta_id', type: 'varchar', length: 64 })
  consultaId: string;

  @ManyToOne(() => ConsultaClinica, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'consulta_id' })
  consulta?: ConsultaClinica;
}
