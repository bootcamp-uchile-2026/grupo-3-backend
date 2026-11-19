import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FichaMascota } from '../../usuarios/entities/mascota.entity';
import { Veterinario } from '../../usuarios/entities/veterinario.entity';

@Entity('consultas')
export class ConsultaClinica {
  @ApiProperty({ description: 'Identificador único de la atención clínica' })
  @PrimaryColumn({ name: 'id_atencion', type: 'varchar', length: 64 })
  idAtencion: string;

  @ApiProperty({ description: 'Diagnóstico médico' })
  @Column({ type: 'text' })
  diagnostico: string;

  @ApiProperty({ description: 'Fecha de la consulta actual' })
  @Column({ name: 'fecha_consulta', type: 'datetime' })
  fechaConsulta: Date;

  @ApiProperty({
    description: 'Fecha tentativa de la próxima consulta',
    required: false,
  })
  @Column({ name: 'fecha_prox_consulta', type: 'datetime', nullable: true })
  fechaProxConsulta?: Date;

  @ApiProperty({
    description: 'Fecha recomendada para la próxima vacuna',
    required: false,
  })
  @Column({ name: 'fecha_prox_vacuna', type: 'datetime', nullable: true })
  fechaProxVacuna?: Date;

  @ApiProperty({
    description: 'Fecha recomendada para los próximos exámenes',
    required: false,
  })
  @Column({ name: 'fecha_prox_examenes', type: 'datetime', nullable: true })
  fechaProxExamenes?: Date;

  @ApiProperty({ description: 'Identificador de la mascota atendida' })
  @Column({ name: 'mascota_id', type: 'varchar', length: 64 })
  mascotaId: string;

  @ManyToOne(() => FichaMascota, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mascota_id' })
  mascota?: FichaMascota;

  @ApiProperty({ description: 'Identificador del veterinario que atendió' })
  @Column({ name: 'veterinario_id', type: 'varchar', length: 64 })
  veterinarioId: string;

  @ManyToOne(() => Veterinario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'veterinario_id' })
  veterinario?: Veterinario;

  @ApiProperty({
    description: 'Identificador de la receta emitida en esta consulta',
    required: false,
  })
  @Column({ name: 'receta_id', type: 'varchar', length: 64, nullable: true })
  recetaId?: string;
}
