import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DuenioMascota } from './duenio.entity';
import { Veterinario } from './veterinario.entity';
import { FichaMascota } from './mascota.entity';

@Entity('citas')
export class AgendaCitas {
  @ApiProperty({ description: 'Identificador único de la cita' })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({ description: 'Fecha y hora de la cita' })
  @Column({ name: 'fecha_cita', type: 'datetime' })
  fechaCita: Date;

  @ApiProperty({ description: 'Identificador del dueño' })
  @Column({ name: 'duenio_id', type: 'varchar', length: 64 })
  duenioId: string;

  @ManyToOne(() => DuenioMascota, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'duenio_id' })
  duenio?: DuenioMascota;

  @ApiProperty({ description: 'Identificador del veterinario asignado' })
  @Column({ name: 'veterinario_id', type: 'varchar', length: 64 })
  veterinarioId: string;

  @ManyToOne(() => Veterinario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'veterinario_id' })
  veterinario?: Veterinario;

  @ApiProperty({ description: 'Identificador de la mascota a atender' })
  @Column({ name: 'mascota_id', type: 'varchar', length: 64 })
  mascotaId: string;

  @ManyToOne(() => FichaMascota, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mascota_id' })
  mascota?: FichaMascota;

  @ApiProperty({
    description: 'Servicios adicionales solicitados para la cita',
    type: [String],
    example: ['Vacunas', 'Desparasitación', 'Implantación de microchip'],
    required: false,
  })
  @Column({ name: 'servicios_adicionales', type: 'json', nullable: true })
  serviciosAdicionales?: string[];
}
