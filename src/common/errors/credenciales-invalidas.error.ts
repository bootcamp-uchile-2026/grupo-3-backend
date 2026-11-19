export class CredencialesInvalidasError extends Error {
  constructor() {
    super('Credenciales incorrectas');
    this.name = 'CredencialesInvalidasError';
  }
}