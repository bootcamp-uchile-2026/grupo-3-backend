import { Injectable, NotFoundException } from '@nestjs/common';
import { FichaMascota } from './entities/mascota.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { GetMascotaDto } from './dto/get-mascota.dto';
import { DueniosService } from './duenios.service';
import { calcularEdad } from '../common/utils/date.utils';

@Injectable()
export class MascotasService {
  private mascotas: FichaMascota[] = [];

  constructor(private readonly dueniosService: DueniosService) {}

  create(createMascotaDto: CreateMascotaDto): GetMascotaDto {
    // Validar que el dueño exista
    this.dueniosService.findOne(createMascotaDto.duenioId);

    const fechaNac = new Date(createMascotaDto.fechaNacimiento);
    const newMascota: FichaMascota = {
      id: `mascota-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createMascotaDto,
      fechaNacimiento: fechaNac,
      edad: calcularEdad(fechaNac),
    };
    this.mascotas.push(newMascota);
    return this.mapToGetDto(newMascota);
  }

  findAll(): GetMascotaDto[] {
    return this.mascotas.map((m) => this.mapToGetDto(m));
  }

  findOne(id: string): GetMascotaDto {
    const mascota = this.mascotas.find((m) => m.id === id);
    if (!mascota) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    return this.mapToGetDto(mascota);
  }

  findOneEntity(id: string): FichaMascota {
    const mascota = this.mascotas.find((m) => m.id === id);
    if (!mascota) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    return mascota;
  }

  findByDuenio(duenioId: string): GetMascotaDto[] {
    // Validar que el dueño exista
    this.dueniosService.findOne(duenioId);
    return this.mascotas
      .filter((m) => m.duenioId === duenioId)
      .map((m) => this.mapToGetDto(m));
  }

  update(
    id: string,
    updateMascotaDto: Partial<CreateMascotaDto>,
  ): GetMascotaDto {
    const mascotaIndex = this.mascotas.findIndex((m) => m.id === id);
    if (mascotaIndex === -1) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }

    if (updateMascotaDto.duenioId) {
      this.dueniosService.findOne(updateMascotaDto.duenioId);
    }

    const fechaNac = updateMascotaDto.fechaNacimiento
      ? new Date(updateMascotaDto.fechaNacimiento)
      : this.mascotas[mascotaIndex].fechaNacimiento;

    const updatedMascota: FichaMascota = {
      ...this.mascotas[mascotaIndex],
      ...updateMascotaDto,
      fechaNacimiento: fechaNac,
      edad: calcularEdad(fechaNac),
    };
    this.mascotas[mascotaIndex] = updatedMascota;
    return this.mapToGetDto(updatedMascota);
  }

  remove(id: string): { message: string } {
    const mascotaIndex = this.mascotas.findIndex((m) => m.id === id);
    if (mascotaIndex === -1) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    this.mascotas.splice(mascotaIndex, 1);
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
