/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotifications1655472276840 implements MigrationInterface {
    name = 'AddNotifications1655472276840';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TYPE "public"."notification_type_enum" AS ENUM(\'ADMIN\', \'PROJECT\', \'ORGANIZATION\')');
        await queryRunner.query('CREATE TABLE "notification" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."notification_type_enum" NOT NULL DEFAULT \'ADMIN\', "text" character varying NOT NULL, "link" character varying NOT NULL, "users" uuid, "project" uuid, "organization" uuid, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "notification-state" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_new" boolean NOT NULL, "user" uuid, "notification" uuid, CONSTRAINT "PK_501ea6101c487e0daa6470348c2" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "notification" ADD CONSTRAINT "FK_a2bed69b2bd5389338b5f51dd90" FOREIGN KEY ("users") REFERENCES "notification-state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "notification" ADD CONSTRAINT "FK_e8f5f2b899a6bb896ec85cd40c6" FOREIGN KEY ("project") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "notification" ADD CONSTRAINT "FK_ccb6716a233d15425ebd7245ce7" FOREIGN KEY ("organization") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "notification-state" ADD CONSTRAINT "FK_1b9c1a5a24eb0ac61d154a4e439" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "notification-state" ADD CONSTRAINT "FK_a33344c18db3b25c3431a61fe7d" FOREIGN KEY ("notification") REFERENCES "notification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "notification-state" DROP CONSTRAINT "FK_a33344c18db3b25c3431a61fe7d"');
        await queryRunner.query('ALTER TABLE "notification-state" DROP CONSTRAINT "FK_1b9c1a5a24eb0ac61d154a4e439"');
        await queryRunner.query('ALTER TABLE "notification" DROP CONSTRAINT "FK_ccb6716a233d15425ebd7245ce7"');
        await queryRunner.query('ALTER TABLE "notification" DROP CONSTRAINT "FK_e8f5f2b899a6bb896ec85cd40c6"');
        await queryRunner.query('ALTER TABLE "notification" DROP CONSTRAINT "FK_a2bed69b2bd5389338b5f51dd90"');
        await queryRunner.query('DROP TABLE "notification-state"');
        await queryRunner.query('DROP TABLE "notification"');
        await queryRunner.query('DROP TYPE "public"."notification_type_enum"');
    }
}
