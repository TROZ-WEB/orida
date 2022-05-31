/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectImages1653937219741 implements MigrationInterface {
    name = 'AddProjectImages1653937219741';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "image" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "project" uuid NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "image" ADD CONSTRAINT "FK_02625a8f554b8e0e0495b970543" FOREIGN KEY ("project") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "image" DROP CONSTRAINT "FK_02625a8f554b8e0e0495b970543"');
        await queryRunner.query('DROP TABLE "image"');
    }
}
