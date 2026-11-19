import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1731880001000 implements MigrationInterface {
  name = 'SeedInitialData1731880001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Dueños de mascotas (y un usuario ADMIN para pruebas de autorización)
    await queryRunner.query(`
      INSERT IGNORE INTO \`duenios\` (\`id\`, \`nombre\`, \`apellidos\`, \`fecha_nacimiento\`, \`direccion\`, \`correo_electronico\`, \`password_hash\`, \`rol\`)
      VALUES
        ('duenio-1', 'Juan', 'Pérez', '1990-05-15 00:00:00', 'Av. Providencia 1234', 'juan.perez@example.com', 'password123', 'DUENIO'),
        ('duenio-2', 'María', 'González', '1988-11-20 00:00:00', 'Av. Apoquindo 4500', 'maria.gonzalez@example.com', 'password123', 'DUENIO'),
        ('admin-1', 'Admin', 'PetLove', '1985-01-10 00:00:00', 'Casa Matriz PetLove', 'admin@petlove.cl', 'admin123', 'ADMIN');
    `);

    // 2. Veterinarios
    await queryRunner.query(`
      INSERT IGNORE INTO \`veterinarios\` (\`id\`, \`nombre\`, \`apellidos\`, \`fecha_nacimiento\`, \`direccion\`, \`correo_electronico\`, \`password_hash\`, \`rol\`, \`especialidad\`, \`experiencia_anios\`, \`especie_atendida\`, \`descripcion_veterinario\`)
      VALUES
        ('vet-1', 'Carolina', 'Muñoz', '1986-03-12 00:00:00', 'Av. Las Condes 8900', 'carolina.munoz@petlove.cl', 'vet123', 'VETERINARIO', '["Medicina Interna", "Dermatología"]', 12, '["Perro", "Gato"]', 'Especialista en medicina felina y canina con diplomado en dermatología clínica.'),
        ('vet-2', 'Roberto', 'Soto', '1991-08-25 00:00:00', 'Av. Irarrázaval 2400', 'roberto.soto@petlove.cl', 'vet123', 'VETERINARIO', '["Cirugía", "Traumatología"]', 8, '["Perro", "Gato", "Aves"]', 'Médico veterinario cirujano especializado en tejidos blandos y traumatología.');
    `);

    // 3. Mascotas
    await queryRunner.query(`
      INSERT IGNORE INTO \`mascotas\` (\`id\`, \`nombre\`, \`especie\`, \`raza\`, \`fecha_nacimiento\`, \`peso_kg\`, \`sexo\`, \`foto_url\`, \`duenio_id\`, \`alergias\`, \`enfermedades_existentes\`, \`descripcion_mascota\`)
      VALUES
        ('mascota-1', 'Michi', 'Gato', 'Doméstico Pelo Corto', '2023-04-10 00:00:00', 4.20, 'Macho', 'https://example.com/michi.jpg', 'duenio-1', '["Polen"]', '[]', 'Gato indoor muy tranquilo.'),
        ('mascota-2', 'Thor', 'Perro', 'Golden Retriever', '2021-07-01 00:00:00', 28.50, 'Macho', 'https://example.com/thor.jpg', 'duenio-1', '["Pollo"]', '["Dermatitis atópica"]', 'Perro activo y sociable.'),
        ('mascota-3', 'Luna', 'Gato', 'Siamés', '2016-02-14 00:00:00', 3.80, 'Hembra', 'https://example.com/luna.jpg', 'duenio-2', '[]', '["Control renal preventivo"]', 'Gata senior cariñosa.');
    `);

    // 4. Direcciones
    await queryRunner.query(`
      INSERT IGNORE INTO \`direcciones\` (\`id\`, \`usuario_id\`, \`direccion\`, \`departamento_oficina\`, \`comuna\`, \`region\`, \`referencia\`, \`es_predeterminada\`)
      VALUES
        ('dir-1', 'duenio-1', 'Av. Providencia 1234', 'Depto 402', 'Providencia', 'Metropolitana', 'Frente al metro Manuel Montt', 1),
        ('dir-2', 'duenio-2', 'Av. Apoquindo 4500', 'Oficina 901', 'Las Condes', 'Metropolitana', 'Edificio espejo', 1);
    `);

    // 5. Productos del Catálogo
    await queryRunner.query(`
      INSERT IGNORE INTO \`productos\` (
        \`id\`, \`nombre\`, \`tipo\`, \`descripcion\`, \`marca\`, \`precio\`, \`especie\`, \`rango_edad\`,
        \`descuento\`, \`cantidad\`, \`ficha_tecnica\`, \`sku\`, \`stock\`, \`imagenes\`, \`categoria\`,
        \`subcategoria\`, \`material\`, \`precio_original\`, \`modo_de_uso\`, \`ficha_tecnica_detalle\`,
        \`calificacion_promedio\`, \`total_resenas\`
      ) VALUES
        (
          'prod-1',
          'Comedero elevado estilo gatitos 450 ml.',
          'Producto',
          'Comedero elevado compacto de 450 ml para favorecer una postura saludable durante la alimentación.',
          'Catit',
          7490.00,
          'Gato',
          'Adulta',
          15.00,
          1,
          'Capacidad: 450 ml. Medidas: 14x9 cm.',
          'SKU-CAT-001',
          50,
          '["https://example.com/comedero-principal.jpg", "https://example.com/comedero-lateral.jpg"]',
          'Accesorio',
          'Platos y bebederos',
          'Cerámica',
          8990.00,
          'Lavar con agua tibia y jabón neutro antes de usar.',
          '{"capacidad": "450 ml", "medidas": "14 x 9 cm", "diseno": "Elevado y ergonómico"}',
          5.0,
          1
        ),
        (
          'prod-2',
          'Alimento Premium Perro Adulto Raza Mediana 15 kg',
          'Producto',
          'Alimento balanceado completo con proteínas de alta digestibilidad y omega 3 y 6.',
          'Royal Canin',
          54990.00,
          'Perro',
          'Adulta',
          10.00,
          1,
          'Formato saco 15 kg. Proteína bruta mín. 26%.',
          'SKU-DOG-002',
          35,
          '["https://example.com/alimento-perro.jpg"]',
          'Alimento',
          'Alimento seco',
          'No aplica',
          61990.00,
          'Servir ración diaria según tabla de peso de la mascota.',
          '{"peso": "15 kg", "etapa": "Adulta", "sabor": "Carne y arroz"}',
          4.5,
          1
        ),
        (
          'prod-3',
          'Antiparasitario Externo Pipeta Felina',
          'Producto',
          'Protección mensual contra pulgas, garrapatas y ácaros para gatos.',
          'Bravecto',
          18990.00,
          'Gato',
          'Todos',
          0.00,
          1,
          'Pipeta spot-on de 1 dosis para gatos de 2.8 a 6.25 kg.',
          'SKU-FAR-003',
          40,
          '["https://example.com/pipeta-gato.jpg"]',
          'Farmacia',
          'Antiparasitarios',
          'No aplica',
          18990.00,
          'Aplicar directamente sobre la piel en la base del cráneo.',
          '{"duracion": "12 semanas", "via": "Tópica"}',
          0.0,
          0
        ),
        (
          'prod-4',
          'Juguete Interactivo Caña con Plumas para Gato',
          'Producto',
          'Vara flexible con plumas naturales y cascabel para estimular el instinto cazador.',
          'Kong',
          4990.00,
          'Gato',
          'En crecimiento',
          20.00,
          1,
          'Largo de vara: 45 cm.',
          'SKU-JUG-004',
          25,
          '["https://example.com/cana-plumas.jpg"]',
          'Accesorio',
          'Juguetes',
          'Plástico',
          6290.00,
          'Supervisar a la mascota durante el juego.',
          '{"largo": "45 cm", "incluye": "Cascabel y plumas"}',
          0.0,
          0
        );
    `);

    // 6. Servicios Veterinarios y de Bienestar
    await queryRunner.query(`
      INSERT IGNORE INTO \`servicios\` (
        \`id\`, \`nombre\`, \`tipo\`, \`descripcion\`, \`marca\`, \`precio\`, \`especie\`,
        \`rango_edad\`, \`descuento\`, \`cantidad\`, \`ficha_tecnica\`, \`consejos_salud\`
      ) VALUES
        (
          'serv-1',
          'Consulta Veterinaria General',
          'Servicio',
          'Evaluación clínica completa de signos vitales, peso, piel, mucosas y plan preventivo.',
          'Clínica PetLove',
          22000.00,
          'Todos',
          'Todos',
          0.00,
          1,
          'Duración aproximada: 30 minutos.',
          'Se recomienda realizar un chequeo preventivo cada 6 meses.'
        ),
        (
          'serv-2',
          'Baño Sanitario y Peluquería Canina',
          'Servicio',
          'Baño con shampoo hipoalergénico, secado, corte de uñas y limpieza de oídos.',
          'Spa PetLove',
          28000.00,
          'Perro',
          'Todos',
          10.00,
          1,
          'Duración aproximada: 90 minutos.',
          'Mantener el pelaje limpio previene dermatitis y nudos.'
        );
    `);

    // 7. Reseñas iniciales
    await queryRunner.query(`
      INSERT IGNORE INTO \`resenas\` (\`id\`, \`producto_id\`, \`usuario_id\`, \`nombre_usuario\`, \`calificacion\`, \`titulo\`, \`comentario\`, \`fecha\`)
      VALUES
        ('res-1', 'prod-1', 'duenio-1', 'Juan Pérez', 5, 'Excelente comedero', 'A mi gato Michi le encantó la altura y es muy fácil de lavar.', '2026-10-15 14:30:00'),
        ('res-2', 'prod-2', 'duenio-2', 'María González', 4, 'Muy buena calidad', 'Buena digestión y pelaje brillante.', '2026-10-16 10:15:00');
    `);

    // 8. Consulta clínica, receta y orden de examen de ejemplo
    await queryRunner.query(`
      INSERT IGNORE INTO \`consultas\` (\`id_atencion\`, \`diagnostico\`, \`fecha_consulta\`, \`fecha_prox_consulta\`, \`fecha_prox_vacuna\`, \`fecha_prox_examenes\`, \`mascota_id\`, \`veterinario_id\`, \`receta_id\`)
      VALUES
        ('atencion-1', 'Control sano y desparasitación preventiva.', '2026-10-10 11:00:00', '2027-04-10 11:00:00', '2027-10-10 11:00:00', NULL, 'mascota-1', 'vet-1', 'receta-1');
    `);

    await queryRunner.query(`
      INSERT IGNORE INTO \`recetas\` (\`id\`, \`dosis\`, \`frecuencia\`, \`duracion\`, \`fecha_emision\`, \`consulta_id\`, \`productos_prescritos_ids\`)
      VALUES
        ('receta-1', '1 pipeta tópica', 'Cada 12 semanas', '3 meses', '2026-10-10 11:20:00', 'atencion-1', '["prod-3"]');
    `);

    await queryRunner.query(`
      INSERT IGNORE INTO \`ordenes_examen\` (\`id\`, \`fecha_emision\`, \`consulta_id\`)
      VALUES
        ('orden-1', '2026-10-10 11:25:00', 'atencion-1');
    `);

    await queryRunner.query(`
      INSERT IGNORE INTO \`examenes\` (\`id\`, \`nombre_examen\`, \`resultado\`, \`estado\`, \`orden_id\`)
      VALUES
        ('examen-1', 'Perfil Bioquímico Felino', 'Parámetros renales y hepáticos dentro de rangos normales.', 'Completado', 'orden-1');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`examenes\` WHERE \`id\` IN ('examen-1')`);
    await queryRunner.query(`DELETE FROM \`ordenes_examen\` WHERE \`id\` IN ('orden-1')`);
    await queryRunner.query(`DELETE FROM \`recetas\` WHERE \`id\` IN ('receta-1')`);
    await queryRunner.query(`DELETE FROM \`consultas\` WHERE \`id_atencion\` IN ('atencion-1')`);
    await queryRunner.query(`DELETE FROM \`resenas\` WHERE \`id\` IN ('res-1', 'res-2')`);
    await queryRunner.query(`DELETE FROM \`servicios\` WHERE \`id\` IN ('serv-1', 'serv-2')`);
    await queryRunner.query(`DELETE FROM \`productos\` WHERE \`id\` IN ('prod-1', 'prod-2', 'prod-3', 'prod-4')`);
    await queryRunner.query(`DELETE FROM \`direcciones\` WHERE \`id\` IN ('dir-1', 'dir-2')`);
    await queryRunner.query(`DELETE FROM \`mascotas\` WHERE \`id\` IN ('mascota-1', 'mascota-2', 'mascota-3')`);
    await queryRunner.query(`DELETE FROM \`veterinarios\` WHERE \`id\` IN ('vet-1', 'vet-2')`);
    await queryRunner.query(`DELETE FROM \`duenios\` WHERE \`id\` IN ('duenio-1', 'duenio-2', 'admin-1')`);
  }
}
