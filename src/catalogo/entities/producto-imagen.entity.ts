import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('producto_imagenes')
export class ProductoImagen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'int', default: 0 })
  orden: number;

  @ManyToOne(() => Producto, (p) => p.imagenes, { nullable: false, onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;
}