import { ApiProperty } from '@nestjs/swagger';

export class GetConsultaDto {
  @ApiProperty({
    description: 'Identificador único de la atención clínica',
    example: 'atencion-123',
  })
  idAtencion: string;

  @ApiProperty({
    description: 'Diagnóstico médico',
    example: 'Gastroenteritis leve por ingesta inadecuada.',
  })
  diagnostico: string;

  @ApiProperty({
    description: 'Fecha de la consulta actual',
    example: '2026-08-20T18:00:00.000Z',
  })
  fechaConsulta: Date;

  @ApiProperty({
    description: 'Fecha tentativa de la próxima consulta',
    example: '2026-08-27T10:00:00.000Z',
    required: false,
  })
  fechaProxConsulta?: Date;

  @ApiProperty({
    description: 'Fecha recomendada para la próxima vacuna',
    example: '2026-11-20T09:00:00.000Z',
    required: false,
  })
  fechaProxVacuna?: Date;

  @ApiProperty({
    description: 'Fecha recomendada para los próximos exámenes',
    example: '2026-09-20T09:00:00.000Z',
    required: false,
  })
  fechaProxExamenes?: Date;

  @ApiProperty({
    description: 'Identificador de la mascota atendida',
    example: 'mascota-123',
  })
  mascotaId: string;

  @ApiProperty({
    description: 'Identificador del veterinario que atendió',
    example: 'vet-456',
  })
  veterinarioId: string;

  @ApiProperty({
    description: 'Identificador de la receta emitida en esta consulta',
    example: 'receta-789',
    required: false,
  })
  recetaId?: string;
}
