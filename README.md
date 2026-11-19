# PetLove — Aplicación Backend

API REST del e-commerce **PetLove**, una plataforma que combina una tienda de productos para mascotas con la gestión de una clínica veterinaria (citas, consultas, recetas y exámenes).

Proyecto desarrollado por el Grupo 3 en el Taller de Bootcamps (DCC, Universidad de Chile), disciplina Backend.

## Tecnologías

| Componente | Tecnología |
|---|---|
| **Framework** | NestJS 11 (TypeScript) |
| **ORM y Persistencia** | TypeORM + MySQL 8 (con migraciones automáticas y seeds) |
| **Autenticación y Seguridad** | JWT (`@nestjs/jwt`), `bcrypt`, Cookies `HttpOnly` y Guards por roles |
| **Gestión de Archivos** | Multer (`multipart/form-data`) + Servidor de archivos estáticos (`/uploads`) |
| **Validación** | `class-validator`, `class-transformer` y Pipes personalizados con consulta a BD |
| **Documentación de la API** | OpenAPI / Swagger (`@nestjs/swagger`) |
| **Contenedores y Registry** | Docker (multi-stage `node:24-alpine`), Docker Compose y Docker Hub |
| **Despliegue** | AWS EC2 (Ubuntu Server 24.04) |

## Módulos de la API

Todas las rutas de la API usan el prefijo global `/api/v1` (mientras que los archivos estáticos subidos se sirven bajo `/uploads/productos/...`).

| Módulo | Recursos | Ruta base |
|---|---|---|
| **Autenticación** | Registro, login (JWT + Cookie `HttpOnly`), logout, perfil y verificación de rol | `/api/v1/auth` |
| **Usuarios** | Dueños, veterinarios, mascotas, citas y direcciones | `/api/v1/usuarios` |
| **Catálogo** | Productos, subida de imágenes, servicios, reseñas, carrito y pedidos | `/api/v1/catalogo` y `/api/v1/carritos` |
| **Gestión clínica** | Consultas, recetas, órdenes de examen y exámenes | `/api/v1/gestion-clinica` |

## Requisitos

- **Ejecución local:** Node.js 24, npm y MySQL 8 (local o en contenedor Docker).
- **Ejecución con Docker:** Docker y Docker Compose.

## Ejecución local (desarrollo)

1. Copiar el archivo de variables de entorno:

   ```bash
   cp .env.example .env
   ```

2. Levantar el contenedor de base de datos MySQL 8:

   ```bash
   docker compose up -d db
   ```

3. Instalar dependencias, ejecutar migraciones e iniciar el servidor:

   ```bash
   npm install
   npm run migration:run
   npm run start:dev
   ```

La API queda disponible en `http://localhost:3000/api/v1` y la documentación interactiva Swagger en `http://localhost:3000/api`.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run start:dev` | Ejecuta la aplicación en modo desarrollo con recarga automática |
| `npm run build` | Compila el proyecto en la carpeta `dist` |
| `npm run start:prod` | Ejecuta la versión compilada (`node dist/main`) |
| `npm run migration:run` | Ejecuta las migraciones pendientes de TypeORM (estructura + seeds iniciales) |
| `npm run migration:revert` | Revierte la última migración ejecutada en MySQL |
| `npm run lint` | Revisa el código con ESLint |
| `npm run test` | Ejecuta las pruebas unitarias |

## Persistencia y Migraciones (TypeORM)

La configuración de conexión se centraliza en [`src/database/data-source.ts`](src/database/data-source.ts) con `migrationsRun: true` y `synchronize: false`.

Las migraciones se encuentran en `src/database/migrations/`:
1. **`1731880000000-InitialSchema.ts`:** Crea la estructura completa de tablas relacionales en MySQL (`duenios`, `veterinarios`, `mascotas`, `direcciones`, `citas`, `productos`, `servicios`, `resenas`, `carritos`, `carrito_items`, `pedidos`, `pedido_items`, `consultas`, `recetas`, `ordenes_examen`, `examenes`).
2. **`1731880001000-SeedInitialData.ts`:** Inserta los datos iniciales de prueba (dueños, administrador, veterinarios, mascotas, productos, servicios, reseñas y registros clínicos) directamente dentro del flujo de migraciones sin requerir la ejecución manual de archivos SQL externos.

## Autenticación y Autorización (JWT + Roles)

- **Hashing de contraseñas:** Todas las contraseñas registradas o actualizadas se almacenan encriptadas mediante `bcrypt` (10 rondas de salt).
- **Inicio de sesión (`POST /api/v1/auth/login`):** Emite un token JWT firmado que se entrega simultáneamente en la cookie `HttpOnly` `access_token` (para integración directa con Frontend) y en el cuerpo JSON `accessToken` (para pruebas en Swagger y clientes móviles).
- **Perfiles soportados:** `DUENIO`, `VETERINARIO` y `ADMIN`, validados mediante `JwtAuthGuard`, `RolesGuard` y el decorador `@Roles(...)`.
- **Cuentas de prueba iniciales (creadas por la migración seed):**
  - **Dueño:** `juan.perez@example.com` / `password123` (`DUENIO`)
  - **Veterinario:** `carolina.munoz@petlove.cl` / `vet123` (`VETERINARIO`)
  - **Administrador:** `admin@petlove.cl` / `admin123` (`ADMIN`)

## Gestión de Imágenes y Archivos Estáticos

- `POST /api/v1/catalogo/productos/imagenes`: Recibe un archivo en el campo `imagen` (`multipart/form-data`, formatos `jpg`, `jpeg`, `png`, `webp`, `gif`, máx. 5 MB), lo almacena en `uploads/productos/` y retorna su ruta pública.
- `POST /api/v1/catalogo/productos/:id/imagenes`: Sube la imagen y la asocia automáticamente a la galería del producto en la base de datos.
- **Servidor estático:** Las imágenes almacenadas se sirven directamente desde `/uploads/productos/<nombre-archivo>` y persisten en el volumen Docker `uploads-data`.

## Versionado Semántico, Docker Hub y Despliegue

El versionado mantiene coincidencia estricta entre `package.json`, el tag de Git y el tag de la imagen publicada en Docker Hub (ej. `0.3.0` / `v0.3.0`):

### 1. Publicar una nueva versión estable en Docker Hub

```bash
# 1. Crear tag en Git coincidente con package.json (0.3.0)
git tag -a v0.3.0 -m "Release v0.3.0"
git push origin v0.3.0

# 2. Construir y etiquetar la imagen Docker
docker build -t <usuario-dockerhub>/petlove-api:0.3.0 .

# 3. Publicar en Docker Hub
docker push <usuario-dockerhub>/petlove-api:0.3.0
```

### 2. Actualizar la versión desplegada en el servidor (sin reconstruir código fuente)

En el servidor AWS EC2, el archivo `.env` define `DOCKER_IMAGE=<usuario-dockerhub>/petlove-api` y `APP_VERSION=0.3.0`. Para actualizar a una nueva versión publicada en Docker Hub:

```bash
# Actualizar APP_VERSION en .env (ej. APP_VERSION=0.3.0) y ejecutar:
docker compose pull api
docker compose up -d api
```

## Variables de entorno

Definidas en `.env` (a partir de `.env.example`).

| Variable | Descripción |
|---|---|
| `API_PORT` | Puerto publicado de la API en el host (por defecto `3000`) |
| `DOCKER_IMAGE` | Nombre del repositorio de imagen Docker (ej. `usuario/petlove-api`) |
| `APP_VERSION` | Tag de versión de la imagen Docker (ej. `0.3.0`) |
| `JWT_SECRET` | Clave secreta para firma y verificación de tokens JWT |
| `DB_HOST` | Host de MySQL (`localhost` en desarrollo local, `db` en Docker Compose) |
| `DB_PORT` | Puerto de MySQL (`3306`) |
| `MYSQL_DATABASE` | Nombre de la base de datos (`petlove`) |
| `MYSQL_USER` | Usuario de la base de datos |
| `MYSQL_PASSWORD` | Contraseña del usuario de la base de datos |
| `MYSQL_ROOT_PASSWORD` | Contraseña root del contenedor MySQL |

## Documentación de la API (Swagger)

| Recurso | Ruta |
|---|---|
| **Interfaz Swagger** | `/api` |
| **Especificación OpenAPI (JSON)** | `/api-json` |

## Modelo de datos

El detalle del modelo de datos, diagrama entidad-relación y decisiones de diseño se encuentra en [docs/modelo-datos.md](docs/modelo-datos.md).
