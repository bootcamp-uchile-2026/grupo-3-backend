import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DuenioMascota } from '../usuarios/entities/duenio.entity';
import { Veterinario } from '../usuarios/entities/veterinario.entity';
import { FichaMascota } from '../usuarios/entities/mascota.entity';
import { AgendaCitas } from '../usuarios/entities/cita.entity';
import { DireccionUsuario } from '../usuarios/entities/direccion.entity';
import { Producto } from '../catalogo/entities/producto.entity';
import { Servicio } from '../catalogo/entities/servicio.entity';
import { Resena } from '../catalogo/entities/resena.entity';
import { Carrito, ItemCarrito } from '../catalogo/entities/carrito.entity';
import { Pedido, ItemPedido } from '../catalogo/entities/pedido.entity';
import { ConsultaClinica } from '../gestion-clinica/entities/consulta.entity';
import { Receta } from '../gestion-clinica/entities/receta.entity';
import { OrdenExamen } from '../gestion-clinica/entities/orden-examen.entity';
import { Examen } from '../gestion-clinica/entities/examen.entity';
import { InitialSchema1731880000000 } from './migrations/1731880000000-InitialSchema';
import { SeedInitialData1731880001000 } from './migrations/1731880001000-SeedInitialData';
import { HashearPasswords1731880002000 } from './migrations/1731880002000-HashearPasswords';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || process.env.MYSQL_USER || 'petlove',
  password:
    process.env.DB_PASSWORD ||
    process.env.MYSQL_PASSWORD ||
    'cambiar_password',
  database: process.env.DB_NAME || process.env.MYSQL_DATABASE || 'petlove',
  entities: [
    DuenioMascota,
    Veterinario,
    FichaMascota,
    AgendaCitas,
    DireccionUsuario,
    Producto,
    Servicio,
    Resena,
    Carrito,
    ItemCarrito,
    Pedido,
    ItemPedido,
    ConsultaClinica,
    Receta,
    OrdenExamen,
    Examen,
  ],
  migrations: [InitialSchema1731880000000, SeedInitialData1731880001000, HashearPasswords1731880002000],
  synchronize: false,
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
