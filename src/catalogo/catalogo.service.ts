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

  findCategoriasDestacadas() {
    return [
      {
        id: 'cat-1',
        nombre: 'Gatos',
        imagen: 'https://example.com/cat-gatos.jpg',
        ruta: '/catalogo/productos?especie=Gato',
      },
      {
        id: 'cat-2',
        nombre: 'Perros',
        imagen: 'https://example.com/cat-perros.jpg',
        ruta: '/catalogo/productos?especie=Perro',
      },
      {
        id: 'cat-3',
        nombre: 'Aves',
        imagen: 'https://example.com/cat-aves.jpg',
        ruta: '/catalogo/productos?especie=Aves',
      },
      {
        id: 'cat-4',
        nombre: 'Roedores',
        imagen: 'https://example.com/cat-roedores.jpg',
        ruta: '/catalogo/productos?especie=Roedores',
      },
      {
        id: 'cat-5',
        nombre: 'Farmacia',
        imagen: 'https://example.com/cat-farmacia.jpg',
        ruta: '/catalogo/productos?categoria=Farmacia',
      },
      {
        id: 'cat-6',
        nombre: 'Alimentos',
        imagen: 'https://example.com/cat-alimentos.jpg',
        ruta: '/catalogo/productos?categoria=Alimento',
      },
      {
        id: 'cat-7',
        nombre: 'Accesorios',
        imagen: 'https://example.com/cat-accesorios.jpg',
        ruta: '/catalogo/productos?categoria=Accesorio',
      },
    ];
  }

  findAllCompatible(
    especie: string,
    edad: number,
  ): (GetProductoDto | GetServicioDto)[] {
    const allItems: (GetProductoDto | GetServicioDto)[] = [
      ...this.productosService.findAll(),
      ...this.serviciosService.findAll(),
    ];

    let rangoMascota = 'Todos';
    if (edad < 1) {
      rangoMascota = 'En crecimiento';
    } else if (edad >= 1 && edad < 8) {
      rangoMascota = 'Adulta';
    } else {
      rangoMascota = 'Senior';
    }

    return allItems.filter((item) => {
      const matchEspecie =
        item.especie.toLowerCase() === 'todos' ||
        item.especie.toLowerCase() === especie.toLowerCase();

      const itemRango = item.rangoEdad ? item.rangoEdad.toLowerCase() : 'todos';
      const matchRango =
        itemRango === 'todos' ||
        itemRango === rangoMascota.toLowerCase();

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
