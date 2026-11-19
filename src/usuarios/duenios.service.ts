import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DuenioMascota } from './entities/duenio.entity';
import { CreateDuenioDto } from './dto/create-duenio.dto';
import { GetDuenioDto } from './dto/get-duenio.dto';
import { calcularEdad } from '../common/utils/date.utils';
import { UpdateDuenioDto } from './dto/update-duenio.dto';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';

@Injectable()
export class DueniosService {
  constructor(
    @InjectRepository(DuenioMascota)
    private readonly dueniosRepo: Repository<DuenioMascota>,
  ) {}

  async create(createDuenioDto: CreateDuenioDto): Promise<GetDuenioDto> {
    const hashedPassword = createDuenioDto.password
      ? await bcrypt.hash(createDuenioDto.password, 10)
      : undefined;

    const newDuenio = this.dueniosRepo.create({
      id: `duenio-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...createDuenioDto,
      password: hashedPassword,
      fechaNacimiento: new Date(createDuenioDto.fechaNacimiento),
      rol: 'DUENIO',
    });
    const saved = await this.dueniosRepo.save(newDuenio);
    return this.mapToGetDto(saved);
  }

  async findAll(): Promise<GetDuenioDto[]> {
    const list = await this.dueniosRepo.find();
    return list.map((d) => this.mapToGetDto(d));
  }

  async findOne(id: string): Promise<GetDuenioDto> {
    const duenio = await this.dueniosRepo.findOne({ where: { id } });
    if (!duenio) {
      throw new RecursoNoEncontradoError(`Dueño con ID ${id} no encontrado`);
    }
    return this.mapToGetDto(duenio);
  }

  async findOneEntity(id: string): Promise<DuenioMascota> {
    const duenio = await this.dueniosRepo.findOne({ where: { id } });
    if (!duenio) {
      throw new RecursoNoEncontradoError(`Dueño con ID ${id} no encontrado`);
    }
    return duenio;
  }

  async findByEmail(correoElectronico: string): Promise<DuenioMascota | null> {
    return this.dueniosRepo.findOne({ where: { correoElectronico } });
  }

  async update(
    id: string,
    updateDuenioDto: UpdateDuenioDto,
  ): Promise<GetDuenioDto> {
    const existing = await this.findOneEntity(id);
    const hashedPassword = updateDuenioDto.password
      ? await bcrypt.hash(updateDuenioDto.password, 10)
      : existing.password;

    const updatedDuenio = this.dueniosRepo.merge(existing, {
      ...updateDuenioDto,
      password: hashedPassword,
      fechaNacimiento: updateDuenioDto.fechaNacimiento
        ? new Date(updateDuenioDto.fechaNacimiento)
        : existing.fechaNacimiento,
    });
    const saved = await this.dueniosRepo.save(updatedDuenio);
    return this.mapToGetDto(saved);
  }

  async remove(id: string): Promise<{ message: string }> {
    const existing = await this.findOneEntity(id);
    await this.dueniosRepo.remove(existing);
    return { message: `Dueño con ID ${id} eliminado correctamente` };
  }

  private mapToGetDto(duenio: DuenioMascota): GetDuenioDto {
    const { password, ...resto } = duenio;
    return {
      ...resto,
      edad: calcularEdad(duenio.fechaNacimiento),
    };
  }
}
