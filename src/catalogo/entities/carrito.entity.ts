import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('carritos')
export class Carrito {
  @ApiProperty({ description: 'Identificador del carrito (UUID)' })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({ description: 'ID del usuario dueño del carrito', required: false })
  @Column({ name: 'usuario_id', type: 'varchar', length: 64, nullable: true })
  usuarioId?: string;

  @ApiProperty({
    description: 'Lista de artículos en el carrito',
    type: () => [ItemCarrito],
  })
  @OneToMany(() => ItemCarrito, (item) => item.carrito, {
    cascade: true,
    eager: true,
  })
  items: ItemCarrito[];

  @ApiProperty({ description: 'Código de cupón aplicado', required: false })
  @Column({ name: 'cupon_aplicado', type: 'varchar', length: 50, nullable: true })
  cuponAplicado?: string;

  @ApiProperty({ description: 'Monto de descuento por cupón', default: 0 })
  @Column({
    name: 'descuento_cupon',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: {
      to: (val?: number) => val ?? 0,
      from: (val: string | number | null) => Number(val ?? 0),
    },
  })
  descuentoCupon: number;

  @ApiProperty({ description: 'Subtotal antes de cupones' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: {
      to: (val?: number) => val ?? 0,
      from: (val: string | number | null) => Number(val ?? 0),
    },
  })
  subtotal: number;

  @ApiProperty({ description: 'Cantidad total de unidades' })
  @Column({ name: 'total_articulos', type: 'int', default: 0 })
  totalArticulos: number;

  @ApiProperty({ description: 'Monto total a pagar' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: {
      to: (val?: number) => val ?? 0,
      from: (val: string | number | null) => Number(val ?? 0),
    },
  })
  total: number;
}

@Entity('carrito_items')
export class ItemCarrito {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'carrito_id', type: 'varchar', length: 64, nullable: true })
  carritoId?: string;

  @ManyToOne(() => Carrito, (carrito) => carrito.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carrito_id' })
  carrito?: Carrito;

  @ApiProperty({ description: 'ID del producto' })
  @Column({ name: 'producto_id', type: 'varchar', length: 64 })
  productoId: string;

  @ApiProperty({ description: 'Nombre del producto' })
  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @ApiProperty({ description: 'Marca del producto', required: false })
  @Column({ type: 'varchar', length: 100, nullable: true })
  marca?: string;

  @ApiProperty({ description: 'Imagen del producto' })
  @Column({ type: 'varchar', length: 500, default: '' })
  imagen: string;

  @ApiProperty({ description: 'Precio original tachado', required: false })
  @Column({
    name: 'precio_original',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (val?: number) => val,
      from: (val: string | number | null) =>
        val !== null && val !== undefined ? Number(val) : undefined,
    },
  })
  precioOriginal?: number;

  @ApiProperty({ description: 'Precio unitario con descuento' })
  @Column({
    name: 'precio_unitario',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (val: number) => val,
      from: (val: string | number) => Number(val),
    },
  })
  precioUnitario: number;

  @ApiProperty({ description: 'Cantidad seleccionada' })
  @Column({ type: 'int' })
  cantidad: number;

  @ApiProperty({ description: 'Subtotal del ítem (precioUnitario * cantidad)' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (val: number) => val,
      from: (val: string | number) => Number(val),
    },
  })
  subtotal: number;
}
