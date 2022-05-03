/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixMigrations1651585044938 implements MigrationInterface {
    name = 'FixMigrations1651585044938';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "project" DROP CONSTRAINT "FK_4d68b1758ab5b756d3e79f34f57"');
        await queryRunner.query('ALTER TABLE "project_status" DROP COLUMN "created-at"');
        await queryRunner.query('ALTER TABLE "project_status" ADD "created-at" TIMESTAMP NOT NULL DEFAULT now()');
        await queryRunner.query('ALTER TABLE "project_status" DROP COLUMN "modified-at"');
        await queryRunner.query('ALTER TABLE "project_status" ADD "modified-at" TIMESTAMP NOT NULL DEFAULT now()');
        await queryRunner.query('ALTER TABLE "project" ALTER COLUMN "status" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "project" ADD CONSTRAINT "FK_57856cedbec1fbed761154d162b" FOREIGN KEY ("status") REFERENCES "project_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "project" DROP CONSTRAINT "FK_57856cedbec1fbed761154d162b"');
        await queryRunner.query('ALTER TABLE "project" ALTER COLUMN "status" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "project_status" DROP COLUMN "modified-at"');
        await queryRunner.query('ALTER TABLE "project_status" ADD "modified-at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()');
        await queryRunner.query('ALTER TABLE "project_status" DROP COLUMN "created-at"');
        await queryRunner.query('ALTER TABLE "project_status" ADD "created-at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()');
        await queryRunner.query('ALTER TABLE "project" ADD CONSTRAINT "FK_4d68b1758ab5b756d3e79f34f57" FOREIGN KEY ("status") REFERENCES "project_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
}
