import { Injectable, NotFoundException } from '@nestjs/common';
import { DuenioMascota } from './entities/duenio.entity';
import { CreateDuenioDto } from './dto/create-duenio.dto';
import { GetDuenioDto } from './dto/get-duenio.dto';

@Injectable()
export class DueniosService {
  private duenios: DuenioMascota[] = [];

  create(createDuenioDto: CreateDuenioDto): GetDuenioDto {
    const newDuenio: DuenioMascota = {
      id: `duenio-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createDuenioDto,
      fechaNacimiento: new Date(createDuenioDto.fechaNacimiento),
    };
    this.duenios.push(newDuenio);
    return this.mapToGetDto(newDuenio);
  }

  findAll(): GetDuenioDto[] {
    return this.duenios.map((d) => this.mapToGetDto(d));
  }

  findOne(id: string): GetDuenioDto {
    const duenio = this.duenios.find((d) => d.id === id);
    if (!duenio) {
      throw new NotFoundException(`Dueño con ID ${id} no encontrado`);
    }
    return this.mapToGetDto(duenio);
  }

  // Helper interno que sirve para validación interna donde sí necesitamos la entidad completa
  findOneEntity(id: string): DuenioMascota {
    const duenio = this.duenios.find((d) => d.id === id);
    if (!duenio) {
      throw new NotFoundException(`Dueño con ID ${id} no encontrado`);
    }
    return duenio;
  }

  update(id: string, updateDuenioDto: Partial<CreateDuenioDto>): GetDuenioDto {
    const duenioIndex = this.duenios.findIndex((d) => d.id === id);
    if (duenioIndex === -1) {
      throw new NotFoundException(`Dueño con ID ${id} no encontrado`);
    }
    const updatedDuenio: DuenioMascota = {
      ...this.duenios[duenioIndex],
      ...updateDuenioDto,
      fechaNacimiento: updateDuenioDto.fechaNacimiento
        ? new Date(updateDuenioDto.fechaNacimiento)
        : this.duenios[duenioIndex].fechaNacimiento,
    };
    this.duenios[duenioIndex] = updatedDuenio;
    return this.mapToGetDto(updatedDuenio);
  }

  remove(id: string): { message: string } {
    const duenioIndex = this.duenios.findIndex((d) => d.id === id);
    if (duenioIndex === -1) {
      throw new NotFoundException(`Dueño con ID ${id} no encontrado`);
    }
    this.duenios.splice(duenioIndex, 1);
    return { message: `Dueño con ID ${id} eliminado correctamente` };
  }

  private mapToGetDto(duenio: DuenioMascota): GetDuenioDto {
    const dto = { ...duenio };
    delete dto.password;
    return dto;
  }
}
