import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1650552109241 implements MigrationInterface {
    name = 'InitTables1650552109241';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password-hash" character varying NOT NULL, "is-admin" boolean NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TYPE "public"."project_status_enum" AS ENUM(\'DESIGN\', \'RUNNING\', \'COMPLETE\')');
        await queryRunner.query('CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text, "budget" numeric, "participatory-budget-year" integer, "start-date" TIMESTAMP WITH TIME ZONE, "status" "public"."project_status_enum" NOT NULL DEFAULT \'DESIGN\', CONSTRAINT "CHK_147f5ff39dbbb7de1db7bda828" CHECK ("budget" > 0), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "project"');
        await queryRunner.query('DROP TYPE "public"."project_status_enum"');
        await queryRunner.query('DROP TABLE "user"');
    }
}
