/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddThread1652714894652 implements MigrationInterface {
    name = 'AddThread1652714894652';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "thread" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subject" character varying NOT NULL, "post" uuid, CONSTRAINT "REL_df286bdb4e02efc8de7e686de3" UNIQUE ("post"), CONSTRAINT "PK_cabc0f3f27d7b1c70cf64623e02" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "is-admin" DROP DEFAULT');
        await queryRunner.query('ALTER TABLE "thread" ADD CONSTRAINT "FK_df286bdb4e02efc8de7e686de3e" FOREIGN KEY ("post") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "thread" DROP CONSTRAINT "FK_df286bdb4e02efc8de7e686de3e"');
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "is-admin" SET DEFAULT false');
        await queryRunner.query('DROP TABLE "thread"');
    }
}
