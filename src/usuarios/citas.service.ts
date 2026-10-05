import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AgendaCitas } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { GetCitaDto } from './dto/get-cita.dto';
import { DueniosService } from './duenios.service';
import { VeterinariosService } from './veterinarios.service';
import { MascotasService } from './mascotas.service';

@Injectable()
export class CitasService {
  private citas: AgendaCitas[] = [];

  constructor(
    private readonly dueniosService: DueniosService,
    private readonly veterinariosService: VeterinariosService,
    private readonly mascotasService: MascotasService,
  ) {}

  create(createCitaDto: CreateCitaDto): GetCitaDto {
    // Validar que el dueño y el veterinario existan
    this.dueniosService.findOne(createCitaDto.duenioId);
    this.veterinariosService.findOne(createCitaDto.veterinarioId);

    // Validar que la mascota exista
    const mascota = this.mascotasService.findOneEntity(createCitaDto.mascotaId);

    // Validar que la mascota pertenezca al dueño
    if (mascota.duenioId !== createCitaDto.duenioId) {
      throw new BadRequestException(
        `La mascota con ID ${createCitaDto.mascotaId} no pertenece al dueño con ID ${createCitaDto.duenioId}`,
      );
    }

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

  findByMascota(mascotaId: string): GetCitaDto[] {
    this.mascotasService.findOne(mascotaId);
    return this.citas
      .filter((c) => c.mascotaId === mascotaId)
      .map((c) => this.mapToGetDto(c));
  }

  update(id: string, updateCitaDto: Partial<CreateCitaDto>): GetCitaDto {
    const citaIndex = this.citas.findIndex((c) => c.id === id);
    if (citaIndex === -1) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }

    const currentCita = this.citas[citaIndex];
    const targetDuenioId = updateCitaDto.duenioId ?? currentCita.duenioId;
    const targetMascotaId = updateCitaDto.mascotaId ?? currentCita.mascotaId;

    if (updateCitaDto.duenioId) {
      this.dueniosService.findOne(updateCitaDto.duenioId);
    }
    if (updateCitaDto.veterinarioId) {
      this.veterinariosService.findOne(updateCitaDto.veterinarioId);
    }
    if (updateCitaDto.mascotaId) {
      this.mascotasService.findOne(updateCitaDto.mascotaId);
    }

    if (updateCitaDto.duenioId || updateCitaDto.mascotaId) {
      const mascota = this.mascotasService.findOneEntity(targetMascotaId);
      if (mascota.duenioId !== targetDuenioId) {
        throw new BadRequestException(
          `La mascota con ID ${targetMascotaId} no pertenece al dueño con ID ${targetDuenioId}`,
        );
      }
    }

    const updatedCita: AgendaCitas = {
      ...currentCita,
      ...updateCitaDto,
      fechaCita: updateCitaDto.fechaCita
        ? new Date(updateCitaDto.fechaCita)
        : currentCita.fechaCita,
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
      mascotaId: cita.mascotaId,
      serviciosAdicionales: cita.serviciosAdicionales,
    };
  }
}
