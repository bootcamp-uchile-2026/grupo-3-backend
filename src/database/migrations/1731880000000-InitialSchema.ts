import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1731880000000 implements MigrationInterface {
  name = 'InitialSchema1731880000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`duenios\` (
        \`id\` varchar(64) NOT NULL,
        \`nombre\` varchar(100) NOT NULL,
        \`apellidos\` varchar(100) NOT NULL,
        \`fecha_nacimiento\` datetime NOT NULL,
        \`direccion\` varchar(255) NOT NULL,
        \`correo_electronico\` varchar(150) NOT NULL,
        \`password_hash\` varchar(255) NULL,
        \`rol\` varchar(20) NOT NULL DEFAULT 'DUENIO',
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`veterinarios\` (
        \`id\` varchar(64) NOT NULL,
        \`nombre\` varchar(100) NOT NULL,
        \`apellidos\` varchar(100) NOT NULL,
        \`fecha_nacimiento\` datetime NOT NULL,
        \`direccion\` varchar(255) NOT NULL,
        \`correo_electronico\` varchar(150) NOT NULL,
        \`password_hash\` varchar(255) NULL,
        \`rol\` varchar(20) NOT NULL DEFAULT 'VETERINARIO',
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`especialidad\` json NOT NULL,
        \`experiencia_anios\` int NULL,
        \`especie_atendida\` json NULL,
        \`descripcion_veterinario\` text NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`mascotas\` (
        \`id\` varchar(64) NOT NULL,
        \`nombre\` varchar(100) NOT NULL,
        \`especie\` varchar(50) NULL,
        \`raza\` varchar(100) NOT NULL,
        \`fecha_nacimiento\` datetime NOT NULL,
        \`peso_kg\` decimal(6,2) NULL,
        \`sexo\` varchar(20) NULL,
        \`foto_url\` varchar(500) NULL,
        \`duenio_id\` varchar(64) NOT NULL,
        \`alergias\` json NULL,
        \`enfermedades_existentes\` json NULL,
        \`descripcion_mascota\` text NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_mascotas_duenio\` FOREIGN KEY (\`duenio_id\`) REFERENCES \`duenios\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`direcciones\` (
        \`id\` varchar(64) NOT NULL,
        \`usuario_id\` varchar(64) NOT NULL,
        \`direccion\` varchar(255) NOT NULL,
        \`departamento_oficina\` varchar(100) NULL,
        \`comuna\` varchar(100) NOT NULL,
        \`region\` varchar(100) NOT NULL,
        \`referencia\` varchar(255) NULL,
        \`es_predeterminada\` tinyint(1) NOT NULL DEFAULT 0,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_direcciones_usuario\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`duenios\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`citas\` (
        \`id\` varchar(64) NOT NULL,
        \`fecha_cita\` datetime NOT NULL,
        \`duenio_id\` varchar(64) NOT NULL,
        \`veterinario_id\` varchar(64) NOT NULL,
        \`mascota_id\` varchar(64) NOT NULL,
        \`servicios_adicionales\` json NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_citas_duenio\` FOREIGN KEY (\`duenio_id\`) REFERENCES \`duenios\`(\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_citas_veterinario\` FOREIGN KEY (\`veterinario_id\`) REFERENCES \`veterinarios\`(\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_citas_mascota\` FOREIGN KEY (\`mascota_id\`) REFERENCES \`mascotas\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`productos\` (
        \`id\` varchar(64) NOT NULL,
        \`nombre\` varchar(200) NOT NULL,
        \`tipo\` varchar(30) NOT NULL DEFAULT 'Producto',
        \`descripcion\` text NOT NULL,
        \`marca\` varchar(100) NOT NULL,
        \`precio\` decimal(10,2) NOT NULL,
        \`especie\` varchar(50) NOT NULL,
        \`rango_edad\` varchar(50) NULL,
        \`descuento\` decimal(5,2) NOT NULL DEFAULT 0.00,
        \`cantidad\` int NOT NULL DEFAULT 1,
        \`ficha_tecnica\` text NULL,
        \`sku\` varchar(64) NOT NULL,
        \`stock\` int NOT NULL DEFAULT 0,
        \`imagenes\` json NOT NULL,
        \`categoria\` varchar(100) NOT NULL,
        \`subcategoria\` varchar(100) NULL,
        \`material\` varchar(100) NULL,
        \`precio_original\` decimal(10,2) NULL,
        \`modo_de_uso\` text NULL,
        \`ficha_tecnica_detalle\` json NULL,
        \`calificacion_promedio\` decimal(3,1) NOT NULL DEFAULT 0.0,
        \`total_resenas\` int NOT NULL DEFAULT 0,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`IDX_productos_sku\` (\`sku\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`servicios\` (
        \`id\` varchar(64) NOT NULL,
        \`nombre\` varchar(200) NOT NULL,
        \`tipo\` varchar(30) NOT NULL DEFAULT 'Servicio',
        \`descripcion\` text NOT NULL,
        \`marca\` varchar(100) NOT NULL,
        \`precio\` decimal(10,2) NOT NULL,
        \`especie\` varchar(50) NOT NULL,
        \`rango_edad\` varchar(50) NULL,
        \`descuento\` decimal(5,2) NOT NULL DEFAULT 0.00,
        \`cantidad\` int NOT NULL DEFAULT 1,
        \`ficha_tecnica\` text NULL,
        \`consejos_salud\` text NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`resenas\` (
        \`id\` varchar(64) NOT NULL,
        \`producto_id\` varchar(64) NOT NULL,
        \`usuario_id\` varchar(64) NOT NULL,
        \`nombre_usuario\` varchar(150) NOT NULL,
        \`calificacion\` int NOT NULL,
        \`titulo\` varchar(150) NOT NULL,
        \`comentario\` text NOT NULL,
        \`fecha\` datetime NOT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_resenas_producto\` FOREIGN KEY (\`producto_id\`) REFERENCES \`productos\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`carritos\` (
        \`id\` varchar(64) NOT NULL,
        \`usuario_id\` varchar(64) NULL,
        \`cupon_aplicado\` varchar(50) NULL,
        \`descuento_cupon\` decimal(10,2) NOT NULL DEFAULT 0.00,
        \`subtotal\` decimal(10,2) NOT NULL DEFAULT 0.00,
        \`total_articulos\` int NOT NULL DEFAULT 0,
        \`total\` decimal(10,2) NOT NULL DEFAULT 0.00,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`carrito_items\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`carrito_id\` varchar(64) NULL,
        \`producto_id\` varchar(64) NOT NULL,
        \`nombre\` varchar(200) NOT NULL,
        \`marca\` varchar(100) NULL,
        \`imagen\` varchar(500) NOT NULL DEFAULT '',
        \`precio_original\` decimal(10,2) NULL,
        \`precio_unitario\` decimal(10,2) NOT NULL,
        \`cantidad\` int NOT NULL,
        \`subtotal\` decimal(10,2) NOT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_carrito_items_carrito\` FOREIGN KEY (\`carrito_id\`) REFERENCES \`carritos\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`pedidos\` (
        \`id\` varchar(64) NOT NULL,
        \`usuario_id\` varchar(64) NULL,
        \`nombre_cliente\` varchar(100) NOT NULL,
        \`apellidos_cliente\` varchar(100) NOT NULL,
        \`correo_electronico\` varchar(150) NOT NULL,
        \`telefono\` varchar(30) NOT NULL,
        \`tipo_comprobante\` varchar(20) NOT NULL,
        \`rut_documento\` varchar(30) NOT NULL,
        \`tipo_entrega\` varchar(30) NOT NULL,
        \`direccion_entrega\` varchar(500) NULL,
        \`sucursal_retiro\` varchar(200) NULL,
        \`tiempo_estimado_entrega\` varchar(100) NOT NULL,
        \`metodo_pago\` varchar(30) NOT NULL,
        \`subtotal\` decimal(10,2) NOT NULL,
        \`costo_envio\` decimal(10,2) NOT NULL,
        \`descuento\` decimal(10,2) NOT NULL DEFAULT 0.00,
        \`total\` decimal(10,2) NOT NULL,
        \`estado_pedido\` varchar(30) NOT NULL DEFAULT 'Confirmado',
        \`fecha_creacion\` datetime NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`pedido_items\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`pedido_id\` varchar(64) NULL,
        \`producto_id\` varchar(64) NOT NULL,
        \`nombre\` varchar(200) NOT NULL,
        \`imagen\` varchar(500) NOT NULL DEFAULT '',
        \`cantidad\` int NOT NULL,
        \`precio_unitario\` decimal(10,2) NOT NULL,
        \`subtotal\` decimal(10,2) NOT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_pedido_items_pedido\` FOREIGN KEY (\`pedido_id\`) REFERENCES \`pedidos\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`consultas\` (
        \`id_atencion\` varchar(64) NOT NULL,
        \`diagnostico\` text NOT NULL,
        \`fecha_consulta\` datetime NOT NULL,
        \`fecha_prox_consulta\` datetime NULL,
        \`fecha_prox_vacuna\` datetime NULL,
        \`fecha_prox_examenes\` datetime NULL,
        \`mascota_id\` varchar(64) NOT NULL,
        \`veterinario_id\` varchar(64) NOT NULL,
        \`receta_id\` varchar(64) NULL,
        PRIMARY KEY (\`id_atencion\`),
        CONSTRAINT \`FK_consultas_mascota\` FOREIGN KEY (\`mascota_id\`) REFERENCES \`mascotas\`(\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_consultas_veterinario\` FOREIGN KEY (\`veterinario_id\`) REFERENCES \`veterinarios\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`recetas\` (
        \`id\` varchar(64) NOT NULL,
        \`dosis\` varchar(150) NOT NULL,
        \`frecuencia\` varchar(150) NOT NULL,
        \`duracion\` varchar(150) NOT NULL,
        \`fecha_emision\` datetime NOT NULL,
        \`consulta_id\` varchar(64) NOT NULL,
        \`productos_prescritos_ids\` json NOT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_recetas_consulta\` FOREIGN KEY (\`consulta_id\`) REFERENCES \`consultas\`(\`id_atencion\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`ordenes_examen\` (
        \`id\` varchar(64) NOT NULL,
        \`fecha_emision\` datetime NOT NULL,
        \`consulta_id\` varchar(64) NOT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_ordenes_examen_consulta\` FOREIGN KEY (\`consulta_id\`) REFERENCES \`consultas\`(\`id_atencion\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`examenes\` (
        \`id\` varchar(64) NOT NULL,
        \`nombre_examen\` varchar(150) NOT NULL,
        \`resultado\` text NULL,
        \`estado\` varchar(50) NOT NULL DEFAULT 'Pendiente',
        \`orden_id\` varchar(64) NOT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_examenes_orden\` FOREIGN KEY (\`orden_id\`) REFERENCES \`ordenes_examen\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`examenes\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`ordenes_examen\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`recetas\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`consultas\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`pedido_items\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`pedidos\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`carrito_items\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`carritos\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`resenas\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`servicios\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`productos\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`citas\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`direcciones\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`mascotas\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`veterinarios\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`duenios\``);
  }
}
