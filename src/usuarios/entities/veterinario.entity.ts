import { Persona } from './persona.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Veterinario extends Persona {
  @ApiProperty({
    description: 'Especialidades médicas del veterinario',
    type: [String],
    example: ['Cirugía', 'Dermatología'],
  })
  especialidad: string[];

  @ApiProperty({
    description: 'Años de experiencia laboral',
    example: 10,
    required: false,
  })
  experiencia?: number;

  @ApiProperty({
    description: 'Especies de animales que atiende',
    type: [String],
    example: ['Perros', 'Gatos', 'Aves'],
    required: false,
  })
  especieAtendida?: string[];

  @ApiProperty({
    description: 'Descripción profesional o perfil del veterinario',
    example: 'Especialista en medicina felina y canina con postgrado en cirugía',
    required: false,
  })
  descripcionVeterinario?: string;
}
