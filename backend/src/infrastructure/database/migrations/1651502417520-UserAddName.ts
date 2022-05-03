/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddName1651502417520 implements MigrationInterface {
    name = 'UserAddName1651502417520';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ADD COLUMN "firstname" character varying NOT NULL DEFAULT \'noname\'');
        await queryRunner.query('ALTER TABLE "user" ADD COLUMN "lastname" character varying NOT NULL DEFAULT \'noname\'');
        await queryRunner.query('ALTER TABLE "user" ADD COLUMN "fullname" character varying NOT NULL DEFAULT \'noname\'');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "fullname"');
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "lastname"');
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "firstname"');
    }
}
