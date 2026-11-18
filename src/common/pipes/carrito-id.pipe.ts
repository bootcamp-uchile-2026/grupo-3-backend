import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

/** Valida carrito sea UUID **/
export const carritoIdPipe = new ParseUUIDPipe({
  exceptionFactory: () =>
    new BadRequestException('El id del carrito no es válido'),
});
