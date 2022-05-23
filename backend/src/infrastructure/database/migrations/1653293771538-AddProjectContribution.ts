/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectContribution1653293771538 implements MigrationInterface {
    name = 'AddProjectContribution1653293771538';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "project-contribution" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user" uuid NOT NULL, "project" uuid NOT NULL, "role" uuid NOT NULL, CONSTRAINT "PK_1cc613270549c73a4e1a4ed0a24" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "project-contribution" ADD CONSTRAINT "FK_4a132662cf9c95647515f77f0da" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "project-contribution" ADD CONSTRAINT "FK_43898ea06f8675e446b3ee657a0" FOREIGN KEY ("project") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "project-contribution" ADD CONSTRAINT "FK_10c17d0d45b4f98ef98c31ecba1" FOREIGN KEY ("role") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "project-contribution" DROP CONSTRAINT "FK_10c17d0d45b4f98ef98c31ecba1"');
        await queryRunner.query('ALTER TABLE "project-contribution" DROP CONSTRAINT "FK_43898ea06f8675e446b3ee657a0"');
        await queryRunner.query('ALTER TABLE "project-contribution" DROP CONSTRAINT "FK_4a132662cf9c95647515f77f0da"');
        await queryRunner.query('DROP TABLE "project-contribution"');
    }
}
