/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoleManager1651481774685 implements MigrationInterface {
    name = 'UserRoleManager1651481774685';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ADD COLUMN "is-manager" boolean NOT NULL DEFAULT false');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "is-manager"');
    }
}
