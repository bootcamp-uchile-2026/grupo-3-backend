import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('especies')
export class Especie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50, unique: true})
    nombre: string;
    
}