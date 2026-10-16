import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDireccionDto {
  @ApiProperty({ description: 'Calle y número', example: 'Av. Pajarito 3234' })
  direccion: string;

  @ApiPropertyOptional({
    description: 'Departamento, oficina o block',
    example: 'piso 5, depto 506',
  })
  departamentoOficina?: string;

  @ApiProperty({ description: 'Comuna', example: 'Maipú' })
  comuna: string;

  @ApiProperty({ description: 'Región', example: 'Metropolitana' })
  region: string;

  @ApiPropertyOptional({
    description: 'Puntos de referencia de entrega',
    example: 'Portón negro',
  })
  referencia?: string;

  @ApiPropertyOptional({
    description: 'Marcar como dirección predeterminada',
    example: true,
    default: false,
  })
  esPredeterminada?: boolean;
}

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
