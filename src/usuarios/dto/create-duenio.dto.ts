import { ApiProperty } from '@nestjs/swagger';

export class CreateDuenioDto {
  @ApiProperty({ description: 'Nombre del dueño', example: 'Juan' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos del dueño', example: 'Pérez' })
  apellidos: string;

  @ApiProperty({ description: 'Edad del dueño', example: 35 })
  edad: number;

  @ApiProperty({
    description: 'Dirección física',
    example: 'Av. Providencia 1234',
  })
  direccion: string;

  @ApiProperty({
    description: 'Correo electrónico de contacto',
    example: 'juan.perez@example.com',
  })
  correoElectronico: string;

  @ApiProperty({
    description: 'Contraseña para la cuenta',
    example: 'password123',
  })
  password?: string;
}
