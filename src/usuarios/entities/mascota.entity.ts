import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DuenioMascota } from './duenio.entity';

@Entity('mascotas')
export class FichaMascota {
  @ApiProperty({ description: 'Identificador único de la mascota' })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({ description: 'Nombre de la mascota' })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ description: 'Especie (ej. Perro, Gato)', required: false })
  @Column({ type: 'varchar', length: 50, nullable: true })
  especie?: string;

  @ApiProperty({ description: 'Raza de la mascota' })
  @Column({ type: 'varchar', length: 100 })
  raza: string;

  @ApiProperty({ description: 'Fecha de nacimiento' })
  @Column({ name: 'fecha_nacimiento', type: 'datetime' })
  fechaNacimiento: Date;

  @ApiProperty({ description: 'Edad calculada de la mascota en años' })
  edad?: number;

  @ApiProperty({ description: 'Peso de la mascota en kg', required: false })
  @Column({
    name: 'peso_kg',
    type: 'decimal',
    precision: 6,
    scale: 2,
    nullable: true,
    transformer: {
      to: (val?: number) => val,
      from: (val: string | number | null) =>
        val !== null && val !== undefined ? Number(val) : undefined,
    },
  })
  peso?: number;

  @ApiProperty({
    description: 'Sexo de la mascota (M/F o Macho/Hembra)',
    required: false,
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  sexo?: string;

  @ApiProperty({ description: 'URL de la foto de la mascota', required: false })
  @Column({ name: 'foto_url', type: 'varchar', length: 500, nullable: true })
  foto?: string;

  @ApiProperty({ description: 'Identificador del dueño de la mascota' })
  @Column({ name: 'duenio_id', type: 'varchar', length: 64 })
  duenioId: string;

  @ManyToOne(() => DuenioMascota, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'duenio_id' })
  duenio?: DuenioMascota;

  @ApiProperty({
    description: 'Alergias conocidas de la mascota',
    type: [String],
    required: false,
  })
  @Column({ type: 'json', nullable: true })
  alergias?: string[];

  @ApiProperty({
    description: 'Enfermedades o condiciones médicas preexistentes',
    type: [String],
    required: false,
  })
  @Column({ name: 'enfermedades_existentes', type: 'json', nullable: true })
  enfermedadesExistentes?: string[];

  @ApiProperty({
    description: 'Descripción o notas generales sobre la mascota',
    required: false,
  })
  @Column({ name: 'descripcion_mascota', type: 'text', nullable: true })
  descripcionMascota?: string;
}
