# PetLove — Aplicación Backend

API REST del e-commerce **PetLove**, una plataforma que combina una tienda de productos para mascotas con la gestión de una clínica veterinaria (citas, consultas, recetas y exámenes).

Proyecto desarrollado por el Grupo 3 en el Taller de Bootcamps (DCC, Universidad de Chile), disciplina Backend.

## Tecnologías

| | |
|---|---|
| **Framework** | NestJS (TypeScript) |
| **Validación** | `class-validator` y `class-transformer` |
| **Documentación de la API** | OpenAPI / Swagger (`@nestjs/swagger`) |
| **Contenedores** | Docker (imagen multi-stage `node:24-alpine`) y Docker Compose |
| **Base de datos** | MySQL 8 (contenedor) |
| **Despliegue** | AWS EC2 (Ubuntu Server 24.04) |

## Módulos de la API

Todas las rutas usan el prefijo global `/api/v1`.

| Módulo | Recursos | Ruta base |
|---|---|---|
| **Usuarios** | Dueños, veterinarios, mascotas, citas y direcciones | `/api/v1/usuarios` |
| **Catálogo** | Productos, servicios, reseñas, carrito y pedidos | `/api/v1/catalogo` |
| **Gestión clínica** | Consultas, recetas, órdenes de examen y exámenes | `/api/v1/gestion-clinica` |

El detalle de cada operación, sus DTOs de entrada y salida y sus validaciones se encuentra en la documentación Swagger.

> **Estado actual (Hito 2):** los servicios funcionan con implementaciones dummy y almacenamiento en memoria. Los datos se pierden al reiniciar la aplicación. La persistencia en MySQL mediante TypeORM se incorporará en el Hito 3.

## Requisitos

- **Ejecución local:** Node.js 24 y npm.
- **Ejecución con Docker:** Docker y Docker Compose.

## Ejecución local (desarrollo)

```bash
npm install
npm run start:dev
```

La API queda disponible en `http://localhost:3000/api/v1` y la documentación Swagger en `http://localhost:3000/api`.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run start:dev` | Ejecuta la aplicación en modo desarrollo, con recarga automática |
| `npm run build` | Compila el proyecto en la carpeta `dist` |
| `npm run start:prod` | Ejecuta la versión compilada |
| `npm run lint` | Revisa el código con ESLint |
| `npm run test` | Ejecuta las pruebas unitarias |

## Ejecución con Docker

1. Copiar el archivo de variables de entorno y definir las contraseñas:

   ```bash
   cp .env.example .env
   ```

2. Construir y levantar la API y la base de datos:

   ```bash
   docker compose up -d --build
   ```

3. Verificar que ambos servicios estén activos (`petlove-db` debe aparecer como `healthy`):

   ```bash
   docker compose ps
   ```

La API queda disponible en `http://localhost:3000/api/v1`.

### Comandos útiles

| Comando | Descripción |
|---|---|
| `docker compose logs -f api` | Ver los logs de la API en tiempo real |
| `docker compose down` | Detener y eliminar los contenedores (los datos de MySQL se conservan en el volumen) |
| `docker compose down -v` | Detener todo y **eliminar** el volumen de datos de MySQL |

### Arquitectura de contenedores

- **`api`:** construida desde el `Dockerfile` del proyecto. Publica el puerto 3000.
- **`db`:** MySQL 8. No publica su puerto hacia el host; la API se conecta a través de la red interna de Docker usando el nombre del servicio (`db:3306`). Los datos se almacenan en el volumen `mysql-data`.
- La API inicia solo cuando la base de datos responde al healthcheck.

## Variables de entorno

Definidas en `.env` (a partir de `.env.example`). El archivo `.env` no se versiona.

| Variable | Descripción |
|---|---|
| `API_PORT` | Puerto publicado de la API en el host (por defecto 3000) |
| `MYSQL_DATABASE` | Nombre de la base de datos |
| `MYSQL_USER` | Usuario de la base de datos usado por la API |
| `MYSQL_PASSWORD` | Contraseña del usuario de la base de datos |
| `MYSQL_ROOT_PASSWORD` | Contraseña del administrador de MySQL |

Además, `compose.yaml` entrega a la API las variables `PORT`, `NODE_ENV`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`, que se utilizarán al conectar TypeORM.

## Documentación de la API (Swagger)

| | |
|---|---|
| **Interfaz Swagger** | `/api` |
| **Especificación OpenAPI (JSON)** | `/api-json` |

## Convenciones de la API

### Validaciones

Se aplica un `ValidationPipe` global con `whitelist`, `forbidNonWhitelisted` y `transform`. Las peticiones con campos no definidos en el DTO o con valores inválidos se rechazan con un error 400 que detalla cada campo.

### Trazabilidad

- Cada petición recibe un identificador único, devuelto en el header **`X-Request-Id`**. Si el cliente envía este header, se reutiliza su valor.
- Cada petición se registra en los logs al finalizar, con su identificador, método, ruta, código de respuesta y tiempo de ejecución:

  ```
  LOG  [HTTP] [0b429233-68e3-49ca-9cf6-364d9d2a1993] GET /api/v1/catalogo/productos 200 - 9ms
  WARN [HTTP] [23c0d221-da2e-4d0e-bf10-58938e5dfda9] GET /api/v1/catalogo/productos?limit=-5 400 - 4ms
  ```

- En el Hito 2, los middlewares de trazabilidad se aplican a las rutas de productos y dueños.

### Formato de errores

Un filtro global de excepciones entrega todas las respuestas de error con el mismo formato, incluyendo el identificador de la petición:

```json
{
  "statusCode": 404,
  "error": "Recurso no encontrado",
  "message": "Producto con ID no-existe-123 no encontrado",
  "path": "/api/v1/catalogo/productos/no-existe-123",
  "timestamp": "2026-10-16T02:07:03.825Z",
  "requestId": "72a8768f-f4ca-47f8-8a3e-d2fc94613fbe"
}
```

Los errores inesperados responden 500 con un mensaje genérico; el detalle técnico se registra solo en los logs.

## Ambiente desplegado

| | |
|---|---|
| **Proveedor** | AWS EC2 (Ubuntu Server 26.04, t3.small, región us-east-2) |
| **URL base de la API** | `http://18.226.214.170:3000/api/v1` |
| **Documentación Swagger** | `http://18.226.214.170:3000/api` |
| **Base de datos** | MySQL 8 en contenedor, sin exposición pública |

El servidor ejecuta la aplicación con Docker Compose. Para actualizar el despliegue a una nueva versión:

```bash
cd ~/grupo-3-backend
git fetch --all --tags
git checkout <tag-o-rama>
docker compose up -d --build
```

## Modelo de datos

La primera versión del modelo de datos, con su diagrama entidad-relación, las decisiones de normalización y las mejoras planificadas, se encuentra en [docs/modelo-datos.md](docs/modelo-datos.md).

## Flujo de trabajo con Git

- **`main`:** versiones entregadas. Cada entrega se identifica con un tag (`Hito-1`, `Hito-2`, …).
- **`develop`:** rama de integración.
- **`feature/*`, `fix/*`, `docs/*`, `chore/*`:** ramas de trabajo, creadas desde `develop` e integradas mediante Pull Request.

Flujo: rama de trabajo → PR a `develop` → pruebas → PR de `develop` a `main` → tag de la entrega.

## Problemas conocidos

- **Endpoints `PUT` (actualización):** responden 500 porque el cuerpo de la petición no llega al servicio. Afecta a la actualización de recursos en los módulos de usuarios, catálogo y gestión clínica. Las operaciones de creación (`POST`), consulta (`GET`) y eliminación no están afectadas. Se corregirá en el Hito 3.