import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConsultaDto {
  @ApiProperty({
    description: 'Diagnóstico médico inicial de la consulta',
    example: 'Gastroenteritis leve por ingesta inadecuada.',
  })
  @IsString({ message: 'El diagnóstico debe ser un texto' })
  @IsNotEmpty({ message: 'El diagnóstico no puede estar vacío' })
  diagnostico: string;

  @ApiProperty({
    description: 'Fecha de la consulta médica',
    example: '2026-08-20T18:00:00.000Z',
  })
  @IsDateString({}, { message: 'La fecha de la consulta debe ser una fecha válida en formato ISO' })
  fechaConsulta: string | Date;

  @ApiProperty({
    description: 'Fecha tentativa de la próxima consulta',
    example: '2026-08-27T10:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de la próxima consulta debe ser una fecha válida en formato ISO' })
  fechaProxConsulta?: string | Date;

  @ApiProperty({
    description: 'Fecha recomendada para la próxima vacuna',
    example: '2026-11-20T09:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de la próxima vacuna debe ser una fecha válida en formato ISO' })
  fechaProxVacuna?: string | Date;

  @ApiProperty({
    description: 'Fecha recomendada para los próximos exámenes',
    example: '2026-09-20T09:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de los próximos exámenes debe ser una fecha válida en formato ISO' })
  fechaProxExamenes?: string | Date;

  @ApiProperty({
    description: 'ID de la mascota atendida',
    example: 'mascota-123',
  })
  @IsString({ message: 'El ID de la mascota debe ser un texto' })
  @IsNotEmpty({ message: 'El ID de la mascota no puede estar vacío' })
  mascotaId: string;

  @ApiProperty({
    description: 'ID del veterinario que atendió',
    example: 'vet-456',
  })
  @IsString({ message: 'El ID del veterinario debe ser un texto' })
  @IsNotEmpty({ message: 'El ID del veterinario no puede estar vacío' })
  veterinarioId: string;
}
