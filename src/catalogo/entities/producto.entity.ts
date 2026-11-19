import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Especie } from '../../common/entities/especie.entity';
import { ProductoImagen } from './producto-imagen.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 100 })
  marca: string;

  @ManyToOne(() => Categoria, { nullable: false })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @ManyToOne(() => Especie, { nullable: true })
  @JoinColumn({ name: 'especie_id' })
  especie: Especie | null;

  @Column({ type: 'int' })
  precio: number;

  @Column({ name: 'precio_original', type: 'int', nullable: true })
  precioOriginal: number | null;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  //Esta propiedad debe ser revisada en proxima entrega dado que aca este descuento lo debe ingresar cliente y el precio no ya que deberia ser calculado por backend
  @Column({ type: 'int', default: 0 })
  descuento: number;

  @Column({ name: 'rango_edad', type: 'varchar', length: 50, nullable: true })
  rangoEdad: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  material: string | null;

  @Column({ name: 'ficha_tecnica', type: 'text', nullable: true })
  fichaTecnica: string | null;

  @Column({ name: 'modo_de_uso', type: 'text', nullable: true })
  modoDeUso: string | null;

  @Column({ name: 'ficha_tecnica_detalle', type: 'json', nullable: true })
  fichaTecnicaDetalle: Record<string, string | number> | null;

  @OneToMany(() => ProductoImagen, (i) => i.producto, { cascade: true })
  imagenes: ProductoImagen[];
}