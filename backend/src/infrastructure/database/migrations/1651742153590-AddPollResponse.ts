/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPollResponse1651742153590 implements MigrationInterface {
    name = 'AddPollResponse1651742153590';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "poll-response" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "poll" uuid, "user" uuid, CONSTRAINT "PK_c78be82ebef1f6a8f174093dab4" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "poll-response" ADD CONSTRAINT "FK_516c5bb62511cb10f3ed8f28c70" FOREIGN KEY ("poll") REFERENCES "poll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "poll-response" ADD CONSTRAINT "FK_2114f9a2803944c0d93471db3b2" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "poll-response" DROP CONSTRAINT "FK_2114f9a2803944c0d93471db3b2"');
        await queryRunner.query('ALTER TABLE "poll-response" DROP CONSTRAINT "FK_516c5bb62511cb10f3ed8f28c70"');
        await queryRunner.query('DROP TABLE "poll-response"');
    }
}
