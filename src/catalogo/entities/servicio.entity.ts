import { Entity, Column } from 'typeorm';
import { ProductoServicio } from './producto-servicio.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('servicios')
export class Servicio extends ProductoServicio {
  @ApiProperty({
    description: 'Consejos de salud preventivos asociados al servicio',
  })
  @Column({ name: 'consejos_salud', type: 'text' })
  consejosSalud: string;
}
