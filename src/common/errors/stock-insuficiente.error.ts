export class StockInsuficienteError extends Error {
  constructor(
    public readonly disponible: number,
    public readonly producto?: string,
  ) {
    super(
      producto
        ? `Stock insuficiente para ${producto}. Disponible: ${disponible}`
        : `No puedes agregar más unidades. Stock disponible: ${disponible}`,
    );
  }
}
