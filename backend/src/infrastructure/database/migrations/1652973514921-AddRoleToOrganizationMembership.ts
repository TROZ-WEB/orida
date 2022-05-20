/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToOrganizationMembership1652973514921 implements MigrationInterface {
    name = 'AddRoleToOrganizationMembership1652973514921';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "organization-membership" ADD "role" uuid');
        await queryRunner.query('ALTER TABLE "organization-membership" ADD CONSTRAINT "FK_d3f79b80500e7be7d22aad123cc" FOREIGN KEY ("role") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        // seed with first role
        await queryRunner.query('INSERT INTO "role" ("id", "label") VALUES (\'00000000-0000-0000-0000-000000000001\', \'ADMIN\')');
        await queryRunner.query('INSERT INTO "role" ("id", "label") VALUES (\'00000000-0000-0000-0000-000000000002\', \'CONTRIBUTOR\')');
        // set all existing memberships to contributor
        await queryRunner.query('UPDATE "organization-membership" SET "role"=\'00000000-0000-0000-0000-000000000002\'');
        // make role not nullable
        await queryRunner.query('ALTER TABLE "organization-membership" ALTER COLUMN "role" SET NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "organization-membership" DROP CONSTRAINT "FK_d3f79b80500e7be7d22aad123cc"');
        await queryRunner.query('ALTER TABLE "organization-membership" DROP COLUMN "role"');
        await queryRunner.query('DELETE from "role"');
    }
}
