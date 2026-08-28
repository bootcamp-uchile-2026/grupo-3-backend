import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultaDto {
  @ApiProperty({
    description: 'Diagnóstico médico inicial de la consulta',
    example: 'Gastroenteritis leve por ingesta inadecuada.',
  })
  diagnostico: string;

  @ApiProperty({
    description: 'Fecha de la consulta médica',
    example: '2026-08-20T18:00:00.000Z',
  })
  fechaConsulta: string | Date;

  @ApiProperty({
    description: 'Fecha tentativa de la próxima consulta',
    example: '2026-08-27T10:00:00.000Z',
    required: false,
  })
  fechaProxConsulta?: string | Date;

  @ApiProperty({
    description: 'Fecha recomendada para la próxima vacuna',
    example: '2026-11-20T09:00:00.000Z',
    required: false,
  })
  fechaProxVacuna?: string | Date;

  @ApiProperty({
    description: 'Fecha recomendada para los próximos exámenes',
    example: '2026-09-20T09:00:00.000Z',
    required: false,
  })
  fechaProxExamenes?: string | Date;

  @ApiProperty({
    description: 'ID de la mascota atendida',
    example: 'mascota-123',
  })
  mascotaId: string;

  @ApiProperty({
    description: 'ID del veterinario que atendió',
    example: 'vet-456',
  })
  veterinarioId: string;
}
