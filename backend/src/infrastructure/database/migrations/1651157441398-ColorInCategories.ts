/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ColorInCategories1651157441398 implements MigrationInterface {
    name = 'ColorInCategories1651157441398';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "category" ADD "color" character varying');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "category" DROP COLUMN "color"');
    }
}
