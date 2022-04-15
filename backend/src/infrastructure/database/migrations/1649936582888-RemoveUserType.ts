/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserType1649936582888 implements MigrationInterface {
    name = 'RemoveUserType1649936582888';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                DROP COLUMN type;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
}
