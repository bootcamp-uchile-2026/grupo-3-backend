import { Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../catalogo/entities/producto.entity';
import { RecursoNoEncontradoError } from '../errors/recurso-noEncontrado.error';

/**
 * Pipe que consulta la base de datos para validar que el producto exista.
 */
@Injectable()
export class ProductoExistePipe implements PipeTransform<string, Promise<string>> {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepo: Repository<Producto>,
  ) {}

  async transform(value: string): Promise<string> {
    const existe = await this.productosRepo.findOne({ where: { id: value } });
    if (!existe) {
      throw new RecursoNoEncontradoError(`Producto con ID ${value} no encontrado`);
    }
    return value;
  }
}
