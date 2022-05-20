/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrganizationMembership1652967998530 implements MigrationInterface {
    name = 'AddOrganizationMembership1652967998530';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "organization-membership" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user" uuid, "organization" uuid, CONSTRAINT "PK_ed0b651add860c1fd531329f106" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "organization-membership" ADD CONSTRAINT "FK_adfa7ff3fff14f6dc130f543b54" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "organization-membership" ADD CONSTRAINT "FK_0094f6d7e379e6ac35913f5a61e" FOREIGN KEY ("organization") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "organization-membership" DROP CONSTRAINT "FK_0094f6d7e379e6ac35913f5a61e"');
        await queryRunner.query('ALTER TABLE "organization-membership" DROP CONSTRAINT "FK_adfa7ff3fff14f6dc130f543b54"');
        await queryRunner.query('DROP TABLE "organization-membership"');
    }
}
