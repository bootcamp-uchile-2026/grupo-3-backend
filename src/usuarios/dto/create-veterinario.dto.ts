import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateVeterinarioDto {
  @ApiProperty({ description: 'Nombre del veterinario', example: 'Ana' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos del veterinario', example: 'Gómez' })
  @IsString({ message: 'Los apellidos deben ser un texto' })
  @Length(2, 50, { message: 'Los apellidos deben tener entre 2 y 50 caracteres' })
  apellidos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del veterinario (ISO o YYYY-MM-DD)',
    example: '1985-03-20',
  })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)' })
  fechaNacimiento: string | Date;

  @ApiProperty({ description: 'Dirección física', example: 'Calle Falsa 123' })
  @IsString({ message: 'La dirección debe ser un texto' })
  @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
  direccion: string;

  @ApiProperty({
    description: 'Correo electrónico de contacto',
    example: 'ana.gomez@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico debe ser un email válido' })
  correoElectronico: string;

  @ApiProperty({
    description: 'Contraseña para la cuenta del veterinario',
    example: 'vetpass123',
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @Length(6, 100, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Especialidades médicas del veterinario',
    type: [String],
    example: ['Cardiología', 'Cirugía'],
  })
  @IsArray({ message: 'Las especialidades deben ser una lista' })
  @ArrayMinSize(1, { message: 'Debe indicar al menos una especialidad' })
  @IsString({ each: true, message: 'Cada especialidad debe ser un texto' })
  especialidad: string[];

  @ApiProperty({
    description: 'Años de experiencia laboral',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'La experiencia debe ser un número entero de años' })
  @Min(0, { message: 'La experiencia no puede ser negativa' })
  experiencia?: number;

  @ApiProperty({
    description: 'Especies de animales que atiende',
    type: [String],
    example: ['Perros', 'Gatos', 'Aves'],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Las especies atendidas deben ser una lista' })
  @IsString({ each: true, message: 'Cada especie debe ser un texto' })
  especieAtendida?: string[];

  @ApiProperty({
    description: 'Descripción profesional o perfil del veterinario',
    example: 'Especialista en animales pequeños con más de 10 años de experiencia',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcionVeterinario?: string;
}
