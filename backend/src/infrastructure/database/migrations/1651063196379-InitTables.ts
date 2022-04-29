/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1651063196379 implements MigrationInterface {
    name = 'InitTables1651063196379';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TYPE "public"."project_status_enum" AS ENUM(\'DESIGN\', \'RUNNING\', \'COMPLETE\')');
        await queryRunner.query('CREATE TABLE "project" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "budget" numeric, "description" text, "participatory-budget-year" integer, "start-date" TIMESTAMP WITH TIME ZONE, "status" "public"."project_status_enum" NOT NULL DEFAULT \'DESIGN\', "title" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "category" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "picture" character varying, "label" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "user" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password-hash" character varying NOT NULL, "is-admin" boolean NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "project_categories_category" ("project_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_008d2ef0cf21cdb631d0f40522c" PRIMARY KEY ("project_id", "category_id"))');
        await queryRunner.query('CREATE INDEX "IDX_4cedb1263d2cc3c574bcc34f8f" ON "project_categories_category" ("project_id") ');
        await queryRunner.query('CREATE INDEX "IDX_312f89787a2d7a0c6c5e34768c" ON "project_categories_category" ("category_id") ');
        await queryRunner.query('ALTER TABLE "project_categories_category" ADD CONSTRAINT "FK_4cedb1263d2cc3c574bcc34f8f4" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "project_categories_category" ADD CONSTRAINT "FK_312f89787a2d7a0c6c5e34768ce" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "project_categories_category" DROP CONSTRAINT "FK_312f89787a2d7a0c6c5e34768ce"');
        await queryRunner.query('ALTER TABLE "project_categories_category" DROP CONSTRAINT "FK_4cedb1263d2cc3c574bcc34f8f4"');
        await queryRunner.query('DROP INDEX "public"."IDX_312f89787a2d7a0c6c5e34768c"');
        await queryRunner.query('DROP INDEX "public"."IDX_4cedb1263d2cc3c574bcc34f8f"');
        await queryRunner.query('DROP TABLE "project_categories_category"');
        await queryRunner.query('DROP TABLE "user"');
        await queryRunner.query('DROP TABLE "category"');
        await queryRunner.query('DROP TABLE "project"');
        await queryRunner.query('DROP TYPE "public"."project_status_enum"');
    }
}
