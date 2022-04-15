/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserType1649405191003 implements MigrationInterface {
    name = 'AddUserType1649405191003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                ADD COLUMN type character varying;
        `);
        await queryRunner.query(`
            UPDATE "user"
                SET type = 'CITIZEN';
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                ALTER COLUMN type SET NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                DROP COLUMN type;
        `);
    }
}
