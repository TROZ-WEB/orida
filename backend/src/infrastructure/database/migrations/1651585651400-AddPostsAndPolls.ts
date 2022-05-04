/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostsAndPolls1651585651400 implements MigrationInterface {
    name = 'AddPostsAndPolls1651585651400';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "post" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "poll" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post" uuid, CONSTRAINT "REL_d24651c432d919560be6b88838" UNIQUE ("post"), CONSTRAINT "PK_03b5cf19a7f562b231c3458527e" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "project" DROP CONSTRAINT "FK_57856cedbec1fbed761154d162b"');
        await queryRunner.query('ALTER TABLE "project" ALTER COLUMN "status" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "post" ADD CONSTRAINT "FK_adce30ed35dc6929fde901750e8" FOREIGN KEY ("project") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "project" ADD CONSTRAINT "FK_57856cedbec1fbed761154d162b" FOREIGN KEY ("status") REFERENCES "project_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "poll" ADD CONSTRAINT "FK_d24651c432d919560be6b888386" FOREIGN KEY ("post") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "poll" DROP CONSTRAINT "FK_d24651c432d919560be6b888386"');
        await queryRunner.query('ALTER TABLE "project" DROP CONSTRAINT "FK_57856cedbec1fbed761154d162b"');
        await queryRunner.query('ALTER TABLE "post" DROP CONSTRAINT "FK_adce30ed35dc6929fde901750e8"');
        await queryRunner.query('ALTER TABLE "project" ALTER COLUMN "status" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "project" ADD CONSTRAINT "FK_57856cedbec1fbed761154d162b" FOREIGN KEY ("status") REFERENCES "project_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('DROP TABLE "poll"');
        await queryRunner.query('DROP TABLE "post"');
    }
}
