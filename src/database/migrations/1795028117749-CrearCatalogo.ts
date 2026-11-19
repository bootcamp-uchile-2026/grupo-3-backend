import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearCatalogo1795028117749 implements MigrationInterface {
    name = 'CrearCatalogo1795028117749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categorias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`categoria_padre_id\` int NULL, UNIQUE INDEX \`IDX_ccdf6cd1a34ea90a7233325063\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`especies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(50) NOT NULL, UNIQUE INDEX \`IDX_774a1e4f31b985654c7547e928\` (\`nombre\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`productos\` (\`id\` varchar(36) NOT NULL, \`sku\` varchar(50) NOT NULL, \`nombre\` varchar(150) NOT NULL, \`descripcion\` text NOT NULL, \`marca\` varchar(100) NOT NULL, \`precio\` int NOT NULL, \`precio_original\` int NULL, \`stock\` int NOT NULL DEFAULT '0', \`cantidad\` int NOT NULL DEFAULT '1', \`descuento\` int NOT NULL DEFAULT '0', \`rango_edad\` varchar(50) NULL, \`material\` varchar(50) NULL, \`ficha_tecnica\` text NULL, \`modo_de_uso\` text NULL, \`ficha_tecnica_detalle\` json NULL, \`categoria_id\` int NOT NULL, \`especie_id\` int NULL, UNIQUE INDEX \`IDX_805687bf24c1411756fbd37b2f\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`producto_imagenes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(500) NOT NULL, \`orden\` int NOT NULL DEFAULT '0', \`producto_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categorias\` ADD CONSTRAINT \`FK_8603a6c8a0b33a9072d367fed72\` FOREIGN KEY (\`categoria_padre_id\`) REFERENCES \`categorias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productos\` ADD CONSTRAINT \`FK_5aaee6054b643e7c778477193a3\` FOREIGN KEY (\`categoria_id\`) REFERENCES \`categorias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productos\` ADD CONSTRAINT \`FK_0f2f1388743e704d1ea50794bdf\` FOREIGN KEY (\`especie_id\`) REFERENCES \`especies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`producto_imagenes\` ADD CONSTRAINT \`FK_559df03132f0f19a45632688a3b\` FOREIGN KEY (\`producto_id\`) REFERENCES \`productos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`producto_imagenes\` DROP FOREIGN KEY \`FK_559df03132f0f19a45632688a3b\``);
        await queryRunner.query(`ALTER TABLE \`productos\` DROP FOREIGN KEY \`FK_0f2f1388743e704d1ea50794bdf\``);
        await queryRunner.query(`ALTER TABLE \`productos\` DROP FOREIGN KEY \`FK_5aaee6054b643e7c778477193a3\``);
        await queryRunner.query(`ALTER TABLE \`categorias\` DROP FOREIGN KEY \`FK_8603a6c8a0b33a9072d367fed72\``);
        await queryRunner.query(`DROP TABLE \`producto_imagenes\``);
        await queryRunner.query(`DROP INDEX \`IDX_805687bf24c1411756fbd37b2f\` ON \`productos\``);
        await queryRunner.query(`DROP TABLE \`productos\``);
        await queryRunner.query(`DROP INDEX \`IDX_774a1e4f31b985654c7547e928\` ON \`especies\``);
        await queryRunner.query(`DROP TABLE \`especies\``);
        await queryRunner.query(`DROP INDEX \`IDX_ccdf6cd1a34ea90a7233325063\` ON \`categorias\``);
        await queryRunner.query(`DROP TABLE \`categorias\``);
    }

}
