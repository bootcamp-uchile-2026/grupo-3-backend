import { ApiProperty } from '@nestjs/swagger';

export class Receta {
  @ApiProperty({ description: 'Identificador de la receta' })
  id: string;

  @ApiProperty({ description: 'Dosis del medicamento o producto' })
  dosis: string;

  @ApiProperty({ description: 'Frecuencia de administración' })
  frecuencia: string;

  @ApiProperty({ description: 'Duración del tratamiento' })
  duracion: string;

  @ApiProperty({ description: 'Fecha de emisión de la receta' })
  fechaEmision: Date;

  @ApiProperty({ description: 'ID de la consulta a la que pertenece' })
  consultaId: string;

  @ApiProperty({
    description: 'Lista de IDs de productos prescritos',
    type: [String],
  })
  productosPrescritosIds: string[];
}
