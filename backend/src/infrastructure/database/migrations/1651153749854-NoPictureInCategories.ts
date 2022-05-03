/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class NoPictureInCategories1651153749854 implements MigrationInterface {
    name = 'NoPictureInCategories1651153749854';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "category" DROP COLUMN "picture"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "category" ADD "picture" character varying');
    }
}
