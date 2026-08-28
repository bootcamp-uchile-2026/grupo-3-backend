import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Shampoo Antichispas',
  })
  nombre: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Limpieza profunda e hidratación',
  })
  descripcion: string;

  @ApiProperty({ description: 'Marca', example: 'PetClean' })
  marca: string;

  @ApiProperty({ description: 'Precio del producto', example: 12990 })
  precio: number;

  @ApiProperty({
    description: 'Especie compatible (ej. Perro, Gato, Todos)',
    example: 'Todos',
  })
  especie: string;

  @ApiProperty({ description: 'Rango de edad compatible', example: 'Todos' })
  rangoEdad: string;

  @ApiProperty({ description: 'Descuento aplicable', example: 10 })
  descuento: number;

  @ApiProperty({ description: 'Cantidad total en empaque', example: 1 })
  cantidad: number;

  @ApiProperty({
    description: 'Ficha técnica del producto',
    example: 'Contenido neto: 500ml. Ingredientes orgánicos.',
  })
  fichaTecnica: string;

  @ApiProperty({ description: 'Stock inicial en inventario', example: 50 })
  stock: number;
}
