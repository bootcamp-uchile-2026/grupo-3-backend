import { ApiProperty } from '@nestjs/swagger';

export class CreateOrdenExamenDto {
  @ApiProperty({
    description: 'ID de la consulta asociada',
    example: 'consulta-123',
  })
  consultaId: string;
}
