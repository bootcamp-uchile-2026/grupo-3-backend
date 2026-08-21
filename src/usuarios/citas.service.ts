import { Injectable, NotFoundException } from '@nestjs/common';
import { AgendaCitas } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { GetCitaDto } from './dto/get-cita.dto';
import { DueniosService } from './duenios.service';
import { VeterinariosService } from './veterinarios.service';

@Injectable()
export class CitasService {
  private citas: AgendaCitas[] = [];

  constructor(
    private readonly dueniosService: DueniosService,
    private readonly veterinariosService: VeterinariosService,
  ) {}

  create(createCitaDto: CreateCitaDto): GetCitaDto {
    // Validar que el dueño y el veterinario existan
    this.dueniosService.findOne(createCitaDto.duenioId);
    this.veterinariosService.findOne(createCitaDto.veterinarioId);

    const newCita: AgendaCitas = {
      id: `cita-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createCitaDto,
      fechaCita: new Date(createCitaDto.fechaCita),
    };
    this.citas.push(newCita);
    return this.mapToGetDto(newCita);
  }

  findAll(): GetCitaDto[] {
    return this.citas.map((c) => this.mapToGetDto(c));
  }

  findOne(id: string): GetCitaDto {
    const cita = this.citas.find((c) => c.id === id);
    if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
    return this.mapToGetDto(cita);
  }

  findOneEntity(id: string): AgendaCitas {
    const cita = this.citas.find((c) => c.id === id);
    if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
    return cita;
  }

  findByDuenio(duenioId: string): GetCitaDto[] {
    this.dueniosService.findOne(duenioId);
    return this.citas
      .filter((c) => c.duenioId === duenioId)
      .map((c) => this.mapToGetDto(c));
  }

  findByVeterinario(veterinarioId: string): GetCitaDto[] {
    this.veterinariosService.findOne(veterinarioId);
    return this.citas
      .filter((c) => c.veterinarioId === veterinarioId)
      .map((c) => this.mapToGetDto(c));
  }

  update(id: string, updateCitaDto: Partial<CreateCitaDto>): GetCitaDto {
    const citaIndex = this.citas.findIndex((c) => c.id === id);
    if (citaIndex === -1) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }

    if (updateCitaDto.duenioId) {
      this.dueniosService.findOne(updateCitaDto.duenioId);
    }
    if (updateCitaDto.veterinarioId) {
      this.veterinariosService.findOne(updateCitaDto.veterinarioId);
    }

    const updatedCita = {
      ...this.citas[citaIndex],
      ...updateCitaDto,
      fechaCita: updateCitaDto.fechaCita
        ? new Date(updateCitaDto.fechaCita)
        : this.citas[citaIndex].fechaCita,
    };
    this.citas[citaIndex] = updatedCita;
    return this.mapToGetDto(updatedCita);
  }

  remove(id: string): { message: string } {
    const citaIndex = this.citas.findIndex((c) => c.id === id);
    if (citaIndex === -1) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
    this.citas.splice(citaIndex, 1);
    return { message: `Cita con ID ${id} eliminada correctamente` };
  }

  private mapToGetDto(cita: AgendaCitas): GetCitaDto {
    return {
      id: cita.id,
      fechaCita: cita.fechaCita,
      duenioId: cita.duenioId,
      veterinarioId: cita.veterinarioId,
    };
  }
}
