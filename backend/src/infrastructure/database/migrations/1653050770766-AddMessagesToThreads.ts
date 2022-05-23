/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessagesToThreads1653050770766 implements MigrationInterface {
    name = 'AddMessagesToThreads1653050770766';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "messages" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "thread_id" uuid, "user" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "messages" ADD CONSTRAINT "FK_bb3af7f695d50083e6523290d41" FOREIGN KEY ("thread_id") REFERENCES "thread"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "messages" ADD CONSTRAINT "FK_e992d71af54f66639d5b90a7cfc" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "messages" DROP CONSTRAINT "FK_e992d71af54f66639d5b90a7cfc"');
        await queryRunner.query('ALTER TABLE "messages" DROP CONSTRAINT "FK_bb3af7f695d50083e6523290d41"');
        await queryRunner.query('DROP TABLE "messages"');
    }
}
