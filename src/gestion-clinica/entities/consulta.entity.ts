import { ApiProperty } from '@nestjs/swagger';

export class ConsultaClinica {
  @ApiProperty({ description: 'Identificador único de la atención clínica' })
  idAtencion: string;

  @ApiProperty({ description: 'Diagnóstico médico' })
  diagnostico: string;

  @ApiProperty({ description: 'Fecha de la consulta actual' })
  fechaConsulta: Date;

  @ApiProperty({
    description: 'Fecha tentativa de la próxima consulta',
    required: false,
  })
  fechaProxConsulta?: Date;

  @ApiProperty({
    description: 'Fecha recomendada para la próxima vacuna',
    required: false,
  })
  fechaProxVacuna?: Date;

  @ApiProperty({
    description: 'Fecha recomendada para los próximos exámenes',
    required: false,
  })
  fechaProxExamenes?: Date;

  @ApiProperty({ description: 'Identificador de la mascota atendida' })
  mascotaId: string;

  @ApiProperty({ description: 'Identificador del veterinario que atendió' })
  veterinarioId: string;

  @ApiProperty({
    description: 'Identificador de la receta emitida en esta consulta',
    required: false,
  })
  recetaId?: string;
}
