import { ProductoServicio } from './producto-servicio.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Servicio extends ProductoServicio {
  @ApiProperty({
    description: 'Consejos de salud preventivos asociados al servicio',
  })
  consejosSalud: string;
}
