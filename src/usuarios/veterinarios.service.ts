import { Injectable } from '@nestjs/common';
import { Veterinario } from './entities/veterinario.entity';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { GetVeterinarioDto } from './dto/get-veterinario.dto';
import { calcularEdad } from '../common/utils/date.utils';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';

@Injectable()
export class VeterinariosService {
  private veterinarios: Veterinario[] = [];

  create(createVeterinarioDto: CreateVeterinarioDto): GetVeterinarioDto {
    const newVeterinario: Veterinario = {
      id: `vet-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createVeterinarioDto,
      fechaNacimiento: new Date(createVeterinarioDto.fechaNacimiento),
    };
    this.veterinarios.push(newVeterinario);
    return this.mapToGetDto(newVeterinario);
  }

  findAll(): GetVeterinarioDto[] {
    return this.veterinarios.map((v) => this.mapToGetDto(v));
  }

  findOne(id: string): GetVeterinarioDto {
    const veterinario = this.veterinarios.find((v) => v.id === id);
    if (!veterinario) {
      throw new RecursoNoEncontradoError(
        `Veterinario con ID ${id} no encontrado`,
      );
    }
    return this.mapToGetDto(veterinario);
  }

  findOneEntity(id: string): Veterinario {
    const veterinario = this.veterinarios.find((v) => v.id === id);
    if (!veterinario) {
      throw new RecursoNoEncontradoError(
        `Veterinario con ID ${id} no encontrado`,
      );
    }
    return veterinario;
  }

  update(
    id: string,
    updateVeterinarioDto: UpdateVeterinarioDto,
  ): GetVeterinarioDto {
    const vetIndex = this.veterinarios.findIndex((v) => v.id === id);
    if (vetIndex === -1) {
      throw new RecursoNoEncontradoError(
        `Veterinario con ID ${id} no encontrado`,
      );
    }
    const updatedVet: Veterinario = {
      ...this.veterinarios[vetIndex],
      ...updateVeterinarioDto,
      fechaNacimiento: updateVeterinarioDto.fechaNacimiento
        ? new Date(updateVeterinarioDto.fechaNacimiento)
        : this.veterinarios[vetIndex].fechaNacimiento,
    };
    this.veterinarios[vetIndex] = updatedVet;
    return this.mapToGetDto(updatedVet);
  }

  remove(id: string): { message: string } {
    const vetIndex = this.veterinarios.findIndex((v) => v.id === id);
    if (vetIndex === -1) {
      throw new RecursoNoEncontradoError(
        `Veterinario con ID ${id} no encontrado`,
      );
    }
    this.veterinarios.splice(vetIndex, 1);
    return { message: `Veterinario con ID ${id} eliminado correctamente` };
  }

  private mapToGetDto(veterinario: Veterinario): GetVeterinarioDto {
    const { password, ...resto } = veterinario;
    return {
      ...resto,
      edad: calcularEdad(veterinario.fechaNacimiento),
    };
  }
}
