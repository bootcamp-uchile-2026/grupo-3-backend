import { ProductoServicio } from './producto-servicio.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Producto extends ProductoServicio {
  @ApiProperty({ description: 'Stock actual disponible en inventario' })
  stock: number;
}
