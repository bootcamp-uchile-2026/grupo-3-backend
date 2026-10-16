import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateMascotaDto {
  @ApiProperty({ description: 'Nombre de la mascota', example: 'Firulais' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  nombre: string;

  @ApiProperty({
    description: 'Especie de la mascota',
    example: 'Perro',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La especie debe ser un texto' })
  especie?: string;

  @ApiProperty({ description: 'Raza de la mascota', example: 'Pastor Alemán' })
  @IsString({ message: 'La raza debe ser un texto' })
  @IsNotEmpty({ message: 'La raza no puede estar vacía' })
  raza: string;

  @ApiProperty({
    description: 'Fecha de nacimiento de la mascota (ISO o YYYY-MM-DD)',
    example: '2020-05-15',
  })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)' })
  fechaNacimiento: string | Date;

  @ApiProperty({
    description: 'Peso de la mascota en kg',
    example: 25.5,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El peso debe ser un número' })
  @Min(0, { message: 'El peso no puede ser negativo' })
  peso?: number;

  @ApiProperty({
    description: 'Sexo de la mascota',
    example: 'Macho',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El sexo debe ser un texto' })
  sexo?: string;

  @ApiProperty({
    description: 'URL de la foto de la mascota',
    example: 'http://example.com/foto.jpg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La foto debe ser una URL en texto' })
  foto?: string;

  @ApiProperty({
    description: 'ID del dueño de la mascota',
    example: 'duenio-123',
  })
  @IsString({ message: 'El ID del dueño debe ser un texto' })
  @IsNotEmpty({ message: 'El ID del dueño no puede estar vacío' })
  duenioId: string;

  @ApiProperty({
    description: 'Alergias conocidas de la mascota',
    example: ['Polen', 'Penicilina'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Las alergias deben ser una lista' })
  @IsString({ each: true, message: 'Cada alergia debe ser un texto' })
  alergias?: string[];

  @ApiProperty({
    description: 'Enfermedades o condiciones preexistentes',
    example: ['Displasia de cadera'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Las enfermedades deben ser una lista' })
  @IsString({ each: true, message: 'Cada enfermedad debe ser un texto' })
  enfermedadesExistentes?: string[];

  @ApiProperty({
    description: 'Descripción o notas adicionales de la mascota',
    example: 'Es muy sociable y juguetón',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcionMascota?: string;
}
