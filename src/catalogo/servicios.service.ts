import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { GetServicioDto } from './dto/get-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { RecursoNoEncontradoError } from 'src/common/errors/recurso-noEncontrado.error';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly serviciosRepo: Repository<Servicio>,
  ) {}

  async create(createServicioDto: CreateServicioDto): Promise<GetServicioDto> {
    const newServicio = this.serviciosRepo.create({
      id: `serv-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'Servicio',
      ...createServicioDto,
    });
    const saved = await this.serviciosRepo.save(newServicio);
    return this.mapToGetDto(saved);
  }

  async findAll(): Promise<GetServicioDto[]> {
    const list = await this.serviciosRepo.find();
    return list.map((s) => this.mapToGetDto(s));
  }

  async findOne(id: string): Promise<GetServicioDto> {
    const servicio = await this.serviciosRepo.findOne({ where: { id } });
    if (!servicio) {
      throw new RecursoNoEncontradoError(`Servicio con ID ${id} no encontrado`);
    }
    return this.mapToGetDto(servicio);
  }

  async findOneEntity(id: string): Promise<Servicio> {
    const servicio = await this.serviciosRepo.findOne({ where: { id } });
    if (!servicio) {
      throw new RecursoNoEncontradoError(`Servicio con ID ${id} no encontrado`);
    }
    return servicio;
  }

  async update(
    id: string,
    updateServicioDto: UpdateServicioDto,
  ): Promise<GetServicioDto> {
    const existing = await this.findOneEntity(id);
    const updatedServ = this.serviciosRepo.merge(existing, updateServicioDto);
    const saved = await this.serviciosRepo.save(updatedServ);
    return this.mapToGetDto(saved);
  }

  async remove(id: string): Promise<{ message: string }> {
    const existing = await this.findOneEntity(id);
    await this.serviciosRepo.remove(existing);
    return { message: `Servicio con ID ${id} eliminado correctamente` };
  }

  private mapToGetDto(servicio: Servicio): GetServicioDto {
    return {
      id: servicio.id,
      nombre: servicio.nombre,
      tipo: servicio.tipo,
      descripcion: servicio.descripcion,
      marca: servicio.marca,
      precio: servicio.precio,
      especie: servicio.especie,
      rangoEdad: servicio.rangoEdad ?? 'Todos',
      descuento: servicio.descuento,
      cantidad: servicio.cantidad,
      fichaTecnica: servicio.fichaTecnica,
      consejosSalud: servicio.consejosSalud,
    };
  }
}
