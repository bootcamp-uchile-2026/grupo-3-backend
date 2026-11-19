import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Veterinario } from './entities/veterinario.entity';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { GetVeterinarioDto } from './dto/get-veterinario.dto';
import { calcularEdad } from '../common/utils/date.utils';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';

@Injectable()
export class VeterinariosService {
  constructor(
    @InjectRepository(Veterinario)
    private readonly veterinariosRepo: Repository<Veterinario>,
  ) {}

  async create(
    createVeterinarioDto: CreateVeterinarioDto,
  ): Promise<GetVeterinarioDto> {
    const hashedPassword = createVeterinarioDto.password
      ? await bcrypt.hash(createVeterinarioDto.password, 10)
      : undefined;

    const newVeterinario = this.veterinariosRepo.create({
      id: `vet-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createVeterinarioDto,
      password: hashedPassword,
      fechaNacimiento: new Date(createVeterinarioDto.fechaNacimiento),
      rol: 'VETERINARIO',
    });
    const saved = await this.veterinariosRepo.save(newVeterinario);
    return this.mapToGetDto(saved);
  }

  async findAll(): Promise<GetVeterinarioDto[]> {
    const list = await this.veterinariosRepo.find();
    return list.map((v) => this.mapToGetDto(v));
  }

  async findOne(id: string): Promise<GetVeterinarioDto> {
    const veterinario = await this.veterinariosRepo.findOne({ where: { id } });
    if (!veterinario) {
      throw new RecursoNoEncontradoError(
        `Veterinario con ID ${id} no encontrado`,
      );
    }
    return this.mapToGetDto(veterinario);
  }

  async findOneEntity(id: string): Promise<Veterinario> {
    const veterinario = await this.veterinariosRepo.findOne({ where: { id } });
    if (!veterinario) {
      throw new RecursoNoEncontradoError(
        `Veterinario con ID ${id} no encontrado`,
      );
    }
    return veterinario;
  }

  async findByEmail(correoElectronico: string): Promise<Veterinario | null> {
    return this.veterinariosRepo.findOne({ where: { correoElectronico } });
  }

  async update(
    id: string,
    updateVeterinarioDto: UpdateVeterinarioDto,
  ): Promise<GetVeterinarioDto> {
    const existing = await this.findOneEntity(id);
    const hashedPassword = updateVeterinarioDto.password
      ? await bcrypt.hash(updateVeterinarioDto.password, 10)
      : existing.password;

    const updatedVet = this.veterinariosRepo.merge(existing, {
      ...updateVeterinarioDto,
      password: hashedPassword,
      fechaNacimiento: updateVeterinarioDto.fechaNacimiento
        ? new Date(updateVeterinarioDto.fechaNacimiento)
        : existing.fechaNacimiento,
    });
    const saved = await this.veterinariosRepo.save(updatedVet);
    return this.mapToGetDto(saved);
  }

  async remove(id: string): Promise<{ message: string }> {
    const existing = await this.findOneEntity(id);
    await this.veterinariosRepo.remove(existing);
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
