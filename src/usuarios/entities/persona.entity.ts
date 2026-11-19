import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

export abstract class Persona {
  @ApiProperty({ description: 'Identificador único' })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({ description: 'Nombre de la persona' })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ description: 'Apellidos de la persona' })
  @Column({ type: 'varchar', length: 100 })
  apellidos: string;

  @ApiProperty({ description: 'Fecha de nacimiento de la persona' })
  @Column({ name: 'fecha_nacimiento', type: 'datetime' })
  fechaNacimiento: Date;

  @ApiProperty({ description: 'Dirección física' })
  @Column({ type: 'varchar', length: 255 })
  direccion: string;

  @ApiProperty({ description: 'Correo electrónico de contacto' })
  @Column({ name: 'correo_electronico', type: 'varchar', length: 150 })
  correoElectronico: string;

  @ApiProperty({ description: 'Contraseña de la cuenta', required: false })
  @Column({ name: 'password_hash', type: 'varchar', length: 255, nullable: true })
  password?: string;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    enum: ['DUENIO', 'VETERINARIO', 'ADMIN'],
    required: false,
  })
  @Column({
    type: 'varchar',
    length: 20,
    default: 'DUENIO',
  })
  rol?: 'DUENIO' | 'VETERINARIO' | 'ADMIN';

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
}
