import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaMascota } from './entities/mascota.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { GetMascotaDto } from './dto/get-mascota.dto';
import { DueniosService } from './duenios.service';
import { calcularEdad } from '../common/utils/date.utils';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(FichaMascota)
    private readonly mascotasRepo: Repository<FichaMascota>,
    private readonly dueniosService: DueniosService,
  ) {}

  async create(createMascotaDto: CreateMascotaDto): Promise<GetMascotaDto> {
    await this.dueniosService.findOne(createMascotaDto.duenioId);

    const fechaNac = new Date(createMascotaDto.fechaNacimiento);
    const newMascota = this.mascotasRepo.create({
      id: `mascota-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createMascotaDto,
      fechaNacimiento: fechaNac,
    });
    const saved = await this.mascotasRepo.save(newMascota);
    return this.mapToGetDto(saved);
  }

  async findAll(): Promise<GetMascotaDto[]> {
    const list = await this.mascotasRepo.find();
    return list.map((m) => this.mapToGetDto(m));
  }

  async findOne(id: string): Promise<GetMascotaDto> {
    const mascota = await this.mascotasRepo.findOne({ where: { id } });
    if (!mascota) {
      throw new RecursoNoEncontradoError(`Mascota con ID ${id} no encontrada`);
    }
    return this.mapToGetDto(mascota);
  }

  async findOneEntity(id: string): Promise<FichaMascota> {
    const mascota = await this.mascotasRepo.findOne({ where: { id } });
    if (!mascota) {
      throw new RecursoNoEncontradoError(`Mascota con ID ${id} no encontrada`);
    }
    return mascota;
  }

  async findByDuenio(duenioId: string): Promise<GetMascotaDto[]> {
    await this.dueniosService.findOne(duenioId);
    const list = await this.mascotasRepo.find({ where: { duenioId } });
    return list.map((m) => this.mapToGetDto(m));
  }

  async update(
    id: string,
    updateMascotaDto: UpdateMascotaDto,
  ): Promise<GetMascotaDto> {
    const existing = await this.findOneEntity(id);

    if (updateMascotaDto.duenioId) {
      await this.dueniosService.findOne(updateMascotaDto.duenioId);
    }

    const fechaNac = updateMascotaDto.fechaNacimiento
      ? new Date(updateMascotaDto.fechaNacimiento)
      : existing.fechaNacimiento;

    const updatedMascota = this.mascotasRepo.merge(existing, {
      ...updateMascotaDto,
      fechaNacimiento: fechaNac,
    });
    const saved = await this.mascotasRepo.save(updatedMascota);
    return this.mapToGetDto(saved);
  }

  async remove(id: string): Promise<{ message: string }> {
    const existing = await this.findOneEntity(id);
    await this.mascotasRepo.remove(existing);
    return { message: `Mascota con ID ${id} eliminada correctamente` };
  }

  private mapToGetDto(mascota: FichaMascota): GetMascotaDto {
    return {
      id: mascota.id,
      nombre: mascota.nombre,
      especie: mascota.especie,
      raza: mascota.raza,
      fechaNacimiento: mascota.fechaNacimiento,
      edad: calcularEdad(mascota.fechaNacimiento),
      peso: mascota.peso,
      sexo: mascota.sexo,
      foto: mascota.foto,
      duenioId: mascota.duenioId,
      alergias: mascota.alergias,
      enfermedadesExistentes: mascota.enfermedadesExistentes,
      descripcionMascota: mascota.descripcionMascota,
    };
  }
}
