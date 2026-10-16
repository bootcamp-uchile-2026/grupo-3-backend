/**
 * Calcula la edad en años a partir de una fecha de nacimiento (Date o string ISO)
 */

// funcion para calcular la edad
export function calcularEdad(fechaNacimiento: Date | string): number {
  // si no hay fecha de nacimiento, retorna 0
  if (!fechaNacimiento) {
    return 0;
  }

  // obtener la fecha actual
  const hoy = new Date();

  // convertir la fecha de nacimiento a Date
  const nacimiento = new Date(fechaNacimiento);

  // si la fecha de nacimiento es invalida, retorna 0
  if (isNaN(nacimiento.getTime())) {
    return 0;
  }

  // calcular la edad
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad >= 0 ? edad : 0;
}
