import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

/**
 * 
 * Configuración de contraseñas de pruebas. Esta migración las reemplaza por su hash con bcypt.
 */
export class HashearPasswords1731880002000 implements MigrationInterface {
  name = 'HashearPasswords1731880002000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const tabla of ['duenios', 'veterinarios']) {
      const filas: { id: string; password_hash: string }[] = await queryRunner.query(
        `SELECT id, password_hash FROM \`${tabla}\` WHERE password_hash NOT LIKE '$2%'`,
      );
      for (const fila of filas) {
        const hash = await bcrypt.hash(fila.password_hash, 10);
        await queryRunner.query(`UPDATE \`${tabla}\` SET password_hash = ? WHERE id = ?`, [
          hash,
          fila.id,
        ]);
      }
    }
  }

  public async down(): Promise<void> {
    //n  Con esto no se vuelve a dejar las contraseñas etexto planon
  }
}