import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// ===== DTO de entrada (validado) =====

export class CreateDireccionDto {
  @ApiProperty({ description: 'Calle y número', example: 'Av. Pajarito 3234' })
  @IsString({ message: 'La dirección debe ser un texto' })
  @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
  direccion: string;

  @ApiPropertyOptional({
    description: 'Departamento, oficina o block',
    example: 'piso 5, depto 506',
  })
  @IsOptional()
  @IsString({ message: 'El departamento u oficina debe ser un texto' })
  departamentoOficina?: string;

  @ApiProperty({ description: 'Comuna', example: 'Maipú' })
  @IsString({ message: 'La comuna debe ser un texto' })
  @IsNotEmpty({ message: 'La comuna no puede estar vacía' })
  comuna: string;

  @ApiProperty({ description: 'Región', example: 'Metropolitana' })
  @IsString({ message: 'La región debe ser un texto' })
  @IsNotEmpty({ message: 'La región no puede estar vacía' })
  region: string;

  @ApiPropertyOptional({
    description: 'Puntos de referencia de entrega',
    example: 'Portón negro',
  })
  @IsOptional()
  @IsString({ message: 'La referencia debe ser un texto' })
  referencia?: string;

  @ApiPropertyOptional({
    description: 'Marcar como dirección predeterminada',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo predeterminada debe ser verdadero o falso' })
  esPredeterminada?: boolean;
}

// ===== DTO de respuesta (no se valida) =====

export class GetDireccionDto {
  @ApiProperty({ description: 'ID de la dirección', example: 'dir-123' })
  id: string;

  @ApiProperty({ description: 'ID del usuario propietario', example: 'duenio-123' })
  usuarioId: string;

  @ApiProperty({ description: 'Calle y número', example: 'Av. Pajarito 3234' })
  direccion: string;

  @ApiPropertyOptional({
    description: 'Departamento u oficina',
    example: 'piso 5, depto 506',
  })
  departamentoOficina?: string;

  @ApiProperty({ description: 'Comuna', example: 'Maipú' })
  comuna: string;

  @ApiProperty({ description: 'Región', example: 'Metropolitana' })
  region: string;

  @ApiPropertyOptional({
    description: 'Referencia',
    example: 'Portón negro',
  })
  referencia?: string;

  @ApiProperty({
    description: 'Si es la dirección predeterminada',
    example: true,
  })
  esPredeterminada: boolean;
}
