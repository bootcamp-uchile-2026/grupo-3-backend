import { Injectable } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ServiciosService } from './servicios.service';
import { GetProductoDto } from './dto/get-producto.dto';
import { GetServicioDto } from './dto/get-servicio.dto';

@Injectable()
export class CatalogoService {
  constructor(
    private readonly productosService: ProductosService,
    private readonly serviciosService: ServiciosService,
  ) {}

  findAllCompatible(
    especie: string,
    edad: number,
  ): (GetProductoDto | GetServicioDto)[] {
    const allItems: (GetProductoDto | GetServicioDto)[] = [
      ...this.productosService.findAll(),
      ...this.serviciosService.findAll(),
    ];

    // Mapear edad a rango de compatibilidad
    let rangoMascota = 'Todos';
    if (edad < 1) {
      rangoMascota = 'Cachorro';
    } else if (edad >= 1 && edad < 8) {
      rangoMascota = 'Adulto';
    } else {
      rangoMascota = 'Senior';
    }

    return allItems.filter((item) => {
      // Validar especie (insensible a mayúsculas)
      const matchEspecie =
        item.especie.toLowerCase() === 'todos' ||
        item.especie.toLowerCase() === especie.toLowerCase();

      // Validar rango de edad (insensible a mayúsculas)
      const matchRango =
        item.rangoEdad.toLowerCase() === 'todos' ||
        item.rangoEdad.toLowerCase() === rangoMascota.toLowerCase();

      return matchEspecie && matchRango;
    });
  }

  findAll(): (GetProductoDto | GetServicioDto)[] {
    return [
      ...this.productosService.findAll(),
      ...this.serviciosService.findAll(),
    ];
  }
}
