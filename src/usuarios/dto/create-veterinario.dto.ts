import { ApiProperty } from '@nestjs/swagger';

export class CreateVeterinarioDto {
  @ApiProperty({ description: 'Nombre del veterinario', example: 'Ana' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos del veterinario', example: 'Gómez' })
  apellidos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del veterinario',
    example: '1985-03-20',
  })
  fechaNacimiento: string | Date;

  @ApiProperty({ description: 'Dirección física', example: 'Calle Falsa 123' })
  direccion: string;

  @ApiProperty({
    description: 'Correo electrónico de contacto',
    example: 'ana.gomez@example.com',
  })
  correoElectronico: string;

  @ApiProperty({
    description: 'Contraseña para la cuenta',
    example: 'vetpass123',
  })
  password?: string;

  @ApiProperty({
    description: 'Especialidad del veterinario',
    example: 'Cardiología',
  })
  especialidad: string;
}
