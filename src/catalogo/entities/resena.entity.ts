import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Producto } from './producto.entity';

@Entity('resenas')
export class Resena {
  @ApiProperty({
    description: 'Identificador único de la reseña',
    example: 'res-123',
  })
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @ApiProperty({
    description: 'ID del producto calificado',
    example: 'prod-456',
  })
  @Column({ name: 'producto_id', type: 'varchar', length: 64 })
  productoId: string;

  @ManyToOne(() => Producto, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'producto_id' })
  producto?: Producto;

  @ApiProperty({ description: 'ID del usuario autor', example: 'usr-789' })
  @Column({ name: 'usuario_id', type: 'varchar', length: 64 })
  usuarioId: string;

  @ApiProperty({
    description: 'Nombre visible del cliente',
    example: 'Carlos Izquierdo',
  })
  @Column({ name: 'nombre_usuario', type: 'varchar', length: 150 })
  nombreUsuario: string;

  @ApiProperty({
    description: 'Calificación dada en estrellas (1 a 5)',
    example: 5,
  })
  @Column({ type: 'int' })
  calificacion: number;

  @ApiProperty({
    description: 'Título de la reseña',
    example: 'Buena relación precio-calidad',
  })
  @Column({ type: 'varchar', length: 150 })
  titulo: string;

  @ApiProperty({
    description: 'Comentario u opinión detallada',
    example:
      'El comedero cumple su función y se siente resistente. Muy recomendable.',
  })
  @Column({ type: 'text' })
  comentario: string;

  @ApiProperty({
    description: 'Fecha de publicación',
    example: '2024-09-24T12:00:00.000Z',
  })
  @Column({ type: 'datetime' })
  fecha: Date;
}
