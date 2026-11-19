import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgendaCitas } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { GetCitaDto } from './dto/get-cita.dto';
import { DueniosService } from './duenios.service';
import { VeterinariosService } from './veterinarios.service';
import { MascotasService } from './mascotas.service';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { ReglaNegocioError } from 'src/common/errors/regla-negocio.error';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(AgendaCitas)
    private readonly citasRepo: Repository<AgendaCitas>,
    private readonly dueniosService: DueniosService,
    private readonly veterinariosService: VeterinariosService,
    private readonly mascotasService: MascotasService,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<GetCitaDto> {
    await this.dueniosService.findOne(createCitaDto.duenioId);
    await this.veterinariosService.findOne(createCitaDto.veterinarioId);

    const mascota = await this.mascotasService.findOneEntity(
      createCitaDto.mascotaId,
    );

    if (mascota.duenioId !== createCitaDto.duenioId) {
      throw new ReglaNegocioError(
        `La mascota con ID ${createCitaDto.mascotaId} no pertenece al dueño con ID ${createCitaDto.duenioId}`,
      );
    }

    const fechaCita = new Date(createCitaDto.fechaCita);
    if (fechaCita.getTime() < Date.now()) {
      throw new ReglaNegocioError(
        'La fecha de la cita no puede ser anterior a la fecha actual',
      );
    }

    const newCita = this.citasRepo.create({
      id: `cita-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createCitaDto,
      fechaCita,
    });
    const saved = await this.citasRepo.save(newCita);
    return this.mapToGetDto(saved);
  }

  async findAll(): Promise<GetCitaDto[]> {
    const list = await this.citasRepo.find();
    return list.map((c) => this.mapToGetDto(c));
  }

  async findOne(id: string): Promise<GetCitaDto> {
    const cita = await this.citasRepo.findOne({ where: { id } });
    if (!cita) {
      throw new RecursoNoEncontradoError(`Cita con ID ${id} no encontrada`);
    }
    return this.mapToGetDto(cita);
  }

  async findOneEntity(id: string): Promise<AgendaCitas> {
    const cita = await this.citasRepo.findOne({ where: { id } });
    if (!cita) {
      throw new RecursoNoEncontradoError(`Cita con ID ${id} no encontrada`);
    }
    return cita;
  }

  async findByDuenio(duenioId: string): Promise<GetCitaDto[]> {
    await this.dueniosService.findOne(duenioId);
    const list = await this.citasRepo.find({ where: { duenioId } });
    return list.map((c) => this.mapToGetDto(c));
  }

  async findByVeterinario(veterinarioId: string): Promise<GetCitaDto[]> {
    await this.veterinariosService.findOne(veterinarioId);
    const list = await this.citasRepo.find({ where: { veterinarioId } });
    return list.map((c) => this.mapToGetDto(c));
  }

  async findByMascota(mascotaId: string): Promise<GetCitaDto[]> {
    await this.mascotasService.findOne(mascotaId);
    const list = await this.citasRepo.find({ where: { mascotaId } });
    return list.map((c) => this.mapToGetDto(c));
  }

  async update(id: string, updateCitaDto: UpdateCitaDto): Promise<GetCitaDto> {
    const currentCita = await this.findOneEntity(id);
    const targetDuenioId = updateCitaDto.duenioId ?? currentCita.duenioId;
    const targetMascotaId = updateCitaDto.mascotaId ?? currentCita.mascotaId;

    if (updateCitaDto.duenioId) {
      await this.dueniosService.findOne(updateCitaDto.duenioId);
    }
    if (updateCitaDto.veterinarioId) {
      await this.veterinariosService.findOne(updateCitaDto.veterinarioId);
    }
    if (updateCitaDto.mascotaId) {
      await this.mascotasService.findOne(updateCitaDto.mascotaId);
    }

    if (updateCitaDto.duenioId || updateCitaDto.mascotaId) {
      const mascota = await this.mascotasService.findOneEntity(targetMascotaId);
      if (mascota.duenioId !== targetDuenioId) {
        throw new ReglaNegocioError(
          `La mascota con ID ${targetMascotaId} no pertenece al dueño con ID ${targetDuenioId}`,
        );
      }
    }

    const updatedCita = this.citasRepo.merge(currentCita, {
      ...updateCitaDto,
      fechaCita: updateCitaDto.fechaCita
        ? new Date(updateCitaDto.fechaCita)
        : currentCita.fechaCita,
    });
    const saved = await this.citasRepo.save(updatedCita);
    return this.mapToGetDto(saved);
  }

  async remove(id: string): Promise<{ message: string }> {
    const existing = await this.findOneEntity(id);
    await this.citasRepo.remove(existing);
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
