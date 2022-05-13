/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLocationToProject1652196324276 implements MigrationInterface {
    name = 'AddLocationToProject1652196324276';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "project" ADD "location" geometry(Point,4326)');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "project" DROP COLUMN "location"');
    }
}
