import { Persona } from './persona.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Veterinario extends Persona {
  @ApiProperty({ description: 'Especialidad médica del veterinario' })
  especialidad: string;
}
