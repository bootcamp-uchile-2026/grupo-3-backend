import { NotFoundException } from '@nestjs/common';

/**
 * Error de dominio para cuando un recurso solicitado no existe.
 */
export class RecursoNoEncontradoException extends NotFoundException {
  constructor(recurso: string, id: string) {
    super({
      message: `${recurso} con ID ${id} no encontrado`,
      error: 'Recurso no encontrado',
    });
  }
}