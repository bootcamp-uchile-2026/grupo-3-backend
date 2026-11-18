import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CompatibilidadQueryDto {
  @ApiProperty({ example: 'Perro' })
  @IsString({ message: 'La especie debe ser un texto' })
  @IsNotEmpty({ message: 'La especie es un campo obligatorio' })
  especie: string;

  @ApiProperty({ example: 3 })
  @Type(() => Number)
  @IsNumber({}, { message: 'La edad debe ser un numero' })
  @Min(0, { message: 'La edad no puede ser negativa' })
  @IsNotEmpty({ message: 'La edad es un campo obligatorio' })
  edad: number;
}
