import { ApiProperty } from '@nestjs/swagger';

export class GetDuenioDto {
  @ApiProperty({
    description: 'Identificador único del dueño',
    example: 'duenio-123',
  })
  id: string;

  @ApiProperty({ description: 'Nombre del dueño', example: 'Juan' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos del dueño', example: 'Pérez' })
  apellidos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del dueño',
    example: '1990-05-15T00:00:00.000Z',
  })
  fechaNacimiento: Date;

  @ApiProperty({
    description: 'Edad calculada del dueño en años',
    example: 36,
  })
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
}
