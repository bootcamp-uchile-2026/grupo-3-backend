import { Entity } from 'typeorm';
import { Persona } from './persona.entity';

@Entity('duenios')
export class DuenioMascota extends Persona {}
