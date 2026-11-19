import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categorias')
export class Categoria{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true})
    nombre: string;

    @ManyToOne(() => Categoria, (c) => c.subcategorias, { nullable: true })
    @JoinColumn({ name: 'categoria_padre_id' })
    categoriaPadre: Categoria | null;

    @OneToMany(() => Categoria, (c) => c.categoriaPadre)
    subcategorias: Categoria[];
}