export class RecursoNoEncontradoError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
  }
}
