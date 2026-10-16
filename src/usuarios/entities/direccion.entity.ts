import { ApiProperty } from '@nestjs/swagger';

export class DireccionUsuario {
  @ApiProperty({ description: 'ID único de la dirección', example: 'dir-123' })
  id: string;

  @ApiProperty({ description: 'ID del usuario dueño', example: 'duenio-123' })
  usuarioId: string;

  @ApiProperty({ description: 'Calle y número', example: 'Av. Pajarito 3234' })
  direccion: string;

  @ApiProperty({
    description: 'Departamento, oficina o block',
    example: 'piso 5, depto 506',
    required: false,
  })
  departamentoOficina?: string;

  @ApiProperty({ description: 'Comuna', example: 'Maipú' })
  comuna: string;

  @ApiProperty({ description: 'Región', example: 'Metropolitana' })
  region: string;

  @ApiProperty({
    description: 'Puntos de referencia de entrega',
    example: 'Cerca del metro',
    required: false,
  })
  referencia?: string;

  @ApiProperty({
    description: 'Indica si es la dirección predeterminada',
    example: true,
    default: false,
  })
  esPredeterminada: boolean;
}
