import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCitaDto {
  @ApiProperty({
    description: 'Fecha y hora de la cita (formato ISO)',
    example: '2026-08-25T10:00:00.000Z',
  })
  @IsDateString({}, { message: 'La fecha de la cita debe ser una fecha válida en formato ISO' })
  fechaCita: string | Date;

  @ApiProperty({ description: 'ID del dueño', example: 'duenio-123' })
  @IsString({ message: 'El ID del dueño debe ser un texto' })
  @IsNotEmpty({ message: 'El ID del dueño no puede estar vacío' })
  duenioId: string;

  @ApiProperty({
    description: 'ID del veterinario seleccionado',
    example: 'vet-456',
  })
  @IsString({ message: 'El ID del veterinario debe ser un texto' })
  @IsNotEmpty({ message: 'El ID del veterinario no puede estar vacío' })
  veterinarioId: string;

  @ApiProperty({
    description: 'ID de la mascota que será atendida',
    example: 'mascota-123',
  })
  @IsString({ message: 'El ID de la mascota debe ser un texto' })
  @IsNotEmpty({ message: 'El ID de la mascota no puede estar vacío' })
  mascotaId: string;

  @ApiProperty({
    description: 'Servicios adicionales para la cita (ej. vacunas, microchip)',
    type: [String],
    example: ['Vacunas', 'Implantación de microchip'],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Los servicios adicionales deben ser una lista' })
  @IsString({ each: true, message: 'Cada servicio adicional debe ser un texto' })
  serviciosAdicionales?: string[];
}
