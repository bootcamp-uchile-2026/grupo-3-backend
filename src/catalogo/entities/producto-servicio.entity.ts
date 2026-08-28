import { ApiProperty } from '@nestjs/swagger';

export abstract class ProductoServicio {
  @ApiProperty({ description: 'Identificador único' })
  id: string;

  @ApiProperty({ description: 'Nombre del producto o servicio' })
  nombre: string;

  @ApiProperty({ description: 'Tipo: Producto o Servicio' })
  tipo: 'Producto' | 'Servicio';

  @ApiProperty({ description: 'Descripción detallada' })
  descripcion: string;

  @ApiProperty({ description: 'Marca o proveedor' })
  marca: string;

  @ApiProperty({ description: 'Precio de venta' })
  precio: number;

  @ApiProperty({
    description: 'Especie animal compatible (ej. Perro, Gato, Todos)',
    example: 'Perro',
  })
  especie: string;

  @ApiProperty({
    description:
      'Rango de edad compatible (ej. Cachorro, Adulto, Senior, Todos)',
    example: 'Todos',
  })
  rangoEdad: string;

  @ApiProperty({ description: 'Porcentaje de descuento (0 a 100)' })
  descuento: number;

  @ApiProperty({ description: 'Cantidad disponible' })
  cantidad: number;

  @ApiProperty({ description: 'Información de la ficha técnica' })
  fichaTecnica: string;
}
