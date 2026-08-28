import { ApiProperty } from '@nestjs/swagger';

export class GetServicioDto {
  @ApiProperty({
    description: 'Identificador único del servicio',
    example: 'serv-abc',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre del servicio',
    example: 'Baño e Higiene Básica',
  })
  nombre: string;

  @ApiProperty({
    description: 'Tipo: Producto o Servicio',
    example: 'Servicio',
  })
  tipo: 'Producto' | 'Servicio';

  @ApiProperty({
    description: 'Descripción del servicio',
    example: 'Incluye lavado de pelo, corte de uñas y limpieza de oídos',
  })
  descripcion: string;

  @ApiProperty({
    description: 'Proveedor o área a cargo',
    example: 'Peluquería',
  })
  marca: string;

  @ApiProperty({ description: 'Precio del servicio', example: 18000 })
  precio: number;

  @ApiProperty({
    description: 'Especie compatible (ej. Perro, Gato, Todos)',
    example: 'Perro',
  })
  especie: string;

  @ApiProperty({ description: 'Rango de edad compatible', example: 'Todos' })
  rangoEdad: string;

  @ApiProperty({ description: 'Descuento aplicable', example: 0 })
  descuento: number;

  @ApiProperty({
    description: 'Cantidad de sesiones o duración en horas',
    example: 1,
  })
  cantidad: number;

  @ApiProperty({
    description: 'Ficha técnica del servicio',
    example: 'Duración aproximada: 1 hora y media.',
  })
  fichaTecnica: string;

  @ApiProperty({
    description: 'Consejos de salud preventivos asociados',
    example: 'Se recomienda bañar a la mascota cada 3 o 4 semanas máximo.',
  })
  consejosSalud: string;
}
