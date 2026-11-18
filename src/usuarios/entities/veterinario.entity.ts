import { Entity, Column } from 'typeorm';
import { Persona } from './persona.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('veterinarios')
export class Veterinario extends Persona {
  @ApiProperty({
    description: 'Especialidades médicas del veterinario',
    type: [String],
    example: ['Cirugía', 'Dermatología'],
  })
  @Column({ type: 'json' })
  especialidad: string[];

  @ApiProperty({
    description: 'Años de experiencia laboral',
    example: 10,
    required: false,
  })
  @Column({ name: 'experiencia_anios', type: 'int', nullable: true })
  experiencia?: number;

  @ApiProperty({
    description: 'Especies de animales que atiende',
    type: [String],
    example: ['Perros', 'Gatos', 'Aves'],
    required: false,
  })
  @Column({ name: 'especie_atendida', type: 'json', nullable: true })
  especieAtendida?: string[];

  @ApiProperty({
    description: 'Descripción profesional o perfil del veterinario',
    example:
      'Especialista en medicina felina y canina con postgrado en cirugía',
    required: false,
  })
  @Column({ name: 'descripcion_veterinario', type: 'text', nullable: true })
  descripcionVeterinario?: string;
}
