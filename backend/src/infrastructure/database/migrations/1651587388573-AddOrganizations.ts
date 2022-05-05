/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrganizations1651587388573 implements MigrationInterface {
    name = 'AddOrganizations1651587388573';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TYPE "public"."organization_type_enum" AS ENUM(\'COLLECTIVITY\', \'ASSOCIATION\', \'COMPANY\')');
        await queryRunner.query('CREATE TABLE "organization" ("created-at" TIMESTAMP NOT NULL DEFAULT now(), "modified-at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."organization_type_enum" NOT NULL DEFAULT \'COLLECTIVITY\', "description" text, "site" character varying, "email" character varying, "phone" character varying, "facebook" character varying, "twitter" character varying, "linkedin" character varying, "instagram" character varying, CONSTRAINT "PK_3b417f4dc66d041627580085f98" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "parent-organizations" ("organization_id_1" uuid NOT NULL, "organization_id_2" uuid NOT NULL, CONSTRAINT "PK_ff4ea973d1a0d60756af4b94c3a" PRIMARY KEY ("organization_id_1", "organization_id_2"))');
        await queryRunner.query('CREATE INDEX "IDX_09713d56ba671c5cd3eca9f0cb" ON "parent-organizations" ("organization_id_1") ');
        await queryRunner.query('CREATE INDEX "IDX_c18e365c071b11e1fc40a60872" ON "parent-organizations" ("organization_id_2") ');
        await queryRunner.query('CREATE TABLE "project_organizations_organization" ("project_id" uuid NOT NULL, "organization_id" uuid NOT NULL, CONSTRAINT "PK_d6d119b22efc119f8c4a10fc8fe" PRIMARY KEY ("project_id", "organization_id"))');
        await queryRunner.query('CREATE INDEX "IDX_006d1001ae1f1b2b21f5861807" ON "project_organizations_organization" ("project_id") ');
        await queryRunner.query('CREATE INDEX "IDX_0b787a42e4569836f006f0b5fd" ON "project_organizations_organization" ("organization_id") ');
        await queryRunner.query('ALTER TABLE "parent-organizations" ADD CONSTRAINT "FK_09713d56ba671c5cd3eca9f0cba" FOREIGN KEY ("organization_id_1") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "parent-organizations" ADD CONSTRAINT "FK_c18e365c071b11e1fc40a608722" FOREIGN KEY ("organization_id_2") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "project_organizations_organization" ADD CONSTRAINT "FK_006d1001ae1f1b2b21f58618079" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "project_organizations_organization" ADD CONSTRAINT "FK_0b787a42e4569836f006f0b5fd2" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "project_organizations_organization" DROP CONSTRAINT "FK_0b787a42e4569836f006f0b5fd2"');
        await queryRunner.query('ALTER TABLE "project_organizations_organization" DROP CONSTRAINT "FK_006d1001ae1f1b2b21f58618079"');
        await queryRunner.query('ALTER TABLE "parent-organizations" DROP CONSTRAINT "FK_c18e365c071b11e1fc40a608722"');
        await queryRunner.query('ALTER TABLE "parent-organizations" DROP CONSTRAINT "FK_09713d56ba671c5cd3eca9f0cba"');
        await queryRunner.query('DROP INDEX "public"."IDX_0b787a42e4569836f006f0b5fd"');
        await queryRunner.query('DROP INDEX "public"."IDX_006d1001ae1f1b2b21f5861807"');
        await queryRunner.query('DROP TABLE "project_organizations_organization"');
        await queryRunner.query('DROP INDEX "public"."IDX_c18e365c071b11e1fc40a60872"');
        await queryRunner.query('DROP INDEX "public"."IDX_09713d56ba671c5cd3eca9f0cb"');
        await queryRunner.query('DROP TABLE "parent-organizations"');
        await queryRunner.query('DROP TABLE "organization"');
        await queryRunner.query('DROP TYPE "public"."organization_type_enum"');
    }
}
