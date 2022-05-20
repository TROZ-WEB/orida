/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveManagerRole1652972125575 implements MigrationInterface {
    name = 'RemoveManagerRole1652972125575';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "is-manager"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ADD "is-manager" boolean NOT NULL DEFAULT false');
    }
}
