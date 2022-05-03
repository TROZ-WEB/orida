/* eslint-disable */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectStatus1651246388938 implements MigrationInterface {
    name = 'AddProjectStatus1651246388938';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // create and prefill table project_status
        await queryRunner.query('CREATE TABLE "project_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created-at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modified-at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "label" character varying NOT NULL, CONSTRAINT "PK_3e9888411f62082be12e16ed545" PRIMARY KEY ("id"))');
        await queryRunner.query('INSERT INTO "project_status" ("id", "label") VALUES (\'00000000-0000-0000-0000-000000000001\', \'DESIGN\'), (\'00000000-0000-0000-0000-000000000002\', \'RUNNING\'), (\'00000000-0000-0000-0000-000000000003\', \'COMPLETE\')');

        // delete existing project column 'status' with enum to replace it with a strong relation to project status table
        await queryRunner.query('ALTER TABLE "project" DROP COLUMN "status"');
        await queryRunner.query('ALTER TABLE "project" ADD COLUMN "status" uuid');
        await queryRunner.query('UPDATE "project" SET "status"=\'00000000-0000-0000-0000-000000000001\'');
        await queryRunner.query('ALTER TABLE "project" ALTER COLUMN "status" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "project" ADD CONSTRAINT "FK_4d68b1758ab5b756d3e79f34f57" FOREIGN KEY("status") REFERENCES project_status("id")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // delete relation to project status table and replace it with enum of status
        await queryRunner.query('ALTER TABLE "project" DROP COLUMN "status"');
        await queryRunner.query('ALTER TABLE "project" ADD COLUMN "status" "public"."project_status_enum" NOT NULL DEFAULT \'DESIGN\'');
        // delete table project status
        await queryRunner.query('DROP TABLE "project_status"');
    }
}