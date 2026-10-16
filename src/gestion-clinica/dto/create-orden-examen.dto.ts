import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrdenExamenDto {
  @ApiProperty({
    description: 'ID de la consulta asociada',
    example: 'consulta-123',
  })
  @IsString({ message: 'El ID de la consulta debe ser un texto' })
  @IsNotEmpty({ message: 'El ID de la consulta no puede estar vacío' })
  consultaId: string;
}
