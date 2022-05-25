/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessagesToThreads1653050770766 implements MigrationInterface {
    name = 'AddMessagesToThreads1653050770766';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "messages" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "thread" uuid, "author" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "messages" ADD CONSTRAINT "FK_2b1cb6901ef922deb43f7024e4d" FOREIGN KEY ("thread") REFERENCES "thread"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "messages" ADD CONSTRAINT "FK_457b316f6608a277dadfbd50957" FOREIGN KEY ("author") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "messages" DROP CONSTRAINT "FK_457b316f6608a277dadfbd50957"');
        await queryRunner.query('ALTER TABLE "messages" DROP CONSTRAINT "FK_2b1cb6901ef922deb43f7024e4d"');
        await queryRunner.query('DROP TABLE "messages"');
    }
}
