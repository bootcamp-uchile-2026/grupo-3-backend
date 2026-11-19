import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DuenioMascota } from './duenio.entity';

@Entity('direcciones')
export class DireccionUsuario {
  @ApiProperty({ description: 'ID único de la dirección', example: 'dir-123' })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({ description: 'ID del usuario dueño', example: 'duenio-123' })
  @Column({ name: 'usuario_id', type: 'varchar', length: 64 })
  usuarioId: string;

  @ManyToOne(() => DuenioMascota, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario?: DuenioMascota;

  @ApiProperty({ description: 'Calle y número', example: 'Av. Pajarito 3234' })
  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @ApiProperty({
    description: 'Departamento, oficina o block',
    example: 'piso 5, depto 506',
    required: false,
  })
  @Column({ name: 'departamento_oficina', type: 'varchar', length: 100, nullable: true })
  departamentoOficina?: string;

  @ApiProperty({ description: 'Comuna', example: 'Maipú' })
  @Column({ type: 'varchar', length: 100 })
  comuna: string;

  @ApiProperty({ description: 'Región', example: 'Metropolitana' })
  @Column({ type: 'varchar', length: 100 })
  region: string;

  @ApiProperty({
    description: 'Puntos de referencia de entrega',
    example: 'Cerca del metro',
    required: false,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  referencia?: string;

  @ApiProperty({
    description: 'Indica si es la dirección predeterminada',
    example: true,
    default: false,
  })
  @Column({ name: 'es_predeterminada', type: 'boolean', default: false })
  esPredeterminada: boolean;
}
