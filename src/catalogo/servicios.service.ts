import { Injectable, NotFoundException } from '@nestjs/common';
import { Servicio } from './entities/servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { GetServicioDto } from './dto/get-servicio.dto';

@Injectable()
export class ServiciosService {
  private servicios: Servicio[] = [];

  create(createServicioDto: CreateServicioDto): GetServicioDto {
    const newServicio: Servicio = {
      id: `serv-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      tipo: 'Servicio',
      ...createServicioDto,
    };
    this.servicios.push(newServicio);
    return this.mapToGetDto(newServicio);
  }

  findAll(): GetServicioDto[] {
    return this.servicios.map((s) => this.mapToGetDto(s));
  }

  findOne(id: string): GetServicioDto {
    const servicio = this.servicios.find((s) => s.id === id);
    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    return this.mapToGetDto(servicio);
  }

  findOneEntity(id: string): Servicio {
    const servicio = this.servicios.find((s) => s.id === id);
    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    return servicio;
  }

  update(
    id: string,
    updateServicioDto: Partial<CreateServicioDto>,
  ): GetServicioDto {
    const servIndex = this.servicios.findIndex((s) => s.id === id);
    if (servIndex === -1) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    const updatedServ = {
      ...this.servicios[servIndex],
      ...updateServicioDto,
    };
    this.servicios[servIndex] = updatedServ;
    return this.mapToGetDto(updatedServ);
  }

  remove(id: string): { message: string } {
    const servIndex = this.servicios.findIndex((s) => s.id === id);
    if (servIndex === -1) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    this.servicios.splice(servIndex, 1);
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
      rangoEdad: servicio.rangoEdad,
      descuento: servicio.descuento,
      cantidad: servicio.cantidad,
      fichaTecnica: servicio.fichaTecnica,
      consejosSalud: servicio.consejosSalud,
    };
  }
}
