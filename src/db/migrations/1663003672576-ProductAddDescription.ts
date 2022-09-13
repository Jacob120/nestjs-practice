import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductAddDescription1663003672576 implements MigrationInterface {
  name = 'ProductAddDescription1663003672576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`description\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(`DROP TABLE \`roles\``);
  }
}
