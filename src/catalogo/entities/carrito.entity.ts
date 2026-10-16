import { ApiProperty } from '@nestjs/swagger';

export class ItemCarrito {
  @ApiProperty({ description: 'ID del producto' })
  productoId: string;

  @ApiProperty({ description: 'Nombre del producto' })
  nombre: string;

  @ApiProperty({ description: 'Marca del producto', required: false })
  marca?: string;

  @ApiProperty({ description: 'Imagen del producto' })
  imagen: string;

  @ApiProperty({ description: 'Precio original tachado', required: false })
  precioOriginal?: number;

  @ApiProperty({ description: 'Precio unitario con descuento' })
  precioUnitario: number;

  @ApiProperty({ description: 'Cantidad seleccionada' })
  cantidad: number;

  @ApiProperty({ description: 'Subtotal del ítem (precioUnitario * cantidad)' })
  subtotal: number;
}

export class Carrito {
  @ApiProperty({ description: 'Identificador del carrito' })
  id: string;

  @ApiProperty({ description: 'ID del usuario propietario', required: false })
  usuarioId?: string;

  @ApiProperty({ description: 'Lista de artículos en el carrito', type: [ItemCarrito] })
  items: ItemCarrito[];

  @ApiProperty({ description: 'Código de cupón aplicado', required: false })
  cuponAplicado?: string;

  @ApiProperty({ description: 'Monto de descuento por cupón', default: 0 })
  descuentoCupon: number;

  @ApiProperty({ description: 'Subtotal antes de cupones' })
  subtotal: number;

  @ApiProperty({ description: 'Cantidad total de unidades' })
  totalArticulos: number;

  @ApiProperty({ description: 'Monto total a pagar' })
  total: number;
}
