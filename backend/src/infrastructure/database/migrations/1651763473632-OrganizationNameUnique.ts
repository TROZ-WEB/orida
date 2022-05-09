/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrganizationNameUnique1651763473632 implements MigrationInterface {
    name = 'OrganizationNameUnique1651763473632';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "parent-organizations" DROP CONSTRAINT "FK_c18e365c071b11e1fc40a608722"');
        await queryRunner.query('ALTER TABLE "parent-organizations" DROP CONSTRAINT "FK_09713d56ba671c5cd3eca9f0cba"');
        await queryRunner.query('ALTER TABLE "project_organizations_organization" DROP CONSTRAINT "FK_006d1001ae1f1b2b21f58618079"');
        await queryRunner.query('ALTER TABLE "project_organizations_organization" DROP CONSTRAINT "FK_0b787a42e4569836f006f0b5fd2"');
        await queryRunner.query('DROP INDEX "public"."IDX_09713d56ba671c5cd3eca9f0cb"');
        await queryRunner.query('DROP INDEX "public"."IDX_c18e365c071b11e1fc40a60872"');
        await queryRunner.query('DROP INDEX "public"."IDX_006d1001ae1f1b2b21f5861807"');
        await queryRunner.query('DROP INDEX "public"."IDX_0b787a42e4569836f006f0b5fd"');
        await queryRunner.query('ALTER TABLE "organization" ADD CONSTRAINT "UQ_c21e615583a3ebbb0977452afb0" UNIQUE ("name")');
        await queryRunner.query('CREATE INDEX "IDX_fec2aed67163d4a918d9061b5b" ON "parent-organizations" ("organization_id_1") ');
        await queryRunner.query('CREATE INDEX "IDX_555e87d17838bd1dd574f96fab" ON "parent-organizations" ("organization_id_2") ');
        await queryRunner.query('CREATE INDEX "IDX_2a30ce1ff81e758f8f8290b79c" ON "project_organizations_organization" ("project_id") ');
        await queryRunner.query('CREATE INDEX "IDX_d8a92c3535ca59bb440327b67e" ON "project_organizations_organization" ("organization_id") ');
        await queryRunner.query('ALTER TABLE "parent-organizations" ADD CONSTRAINT "FK_fec2aed67163d4a918d9061b5b5" FOREIGN KEY ("organization_id_1") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "parent-organizations" ADD CONSTRAINT "FK_555e87d17838bd1dd574f96fab9" FOREIGN KEY ("organization_id_2") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "project_organizations_organization" ADD CONSTRAINT "FK_2a30ce1ff81e758f8f8290b79ce" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "project_organizations_organization" ADD CONSTRAINT "FK_d8a92c3535ca59bb440327b67e8" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "project_organizations_organization" DROP CONSTRAINT "FK_d8a92c3535ca59bb440327b67e8"');
        await queryRunner.query('ALTER TABLE "project_organizations_organization" DROP CONSTRAINT "FK_2a30ce1ff81e758f8f8290b79ce"');
        await queryRunner.query('ALTER TABLE "parent-organizations" DROP CONSTRAINT "FK_555e87d17838bd1dd574f96fab9"');
        await queryRunner.query('ALTER TABLE "parent-organizations" DROP CONSTRAINT "FK_fec2aed67163d4a918d9061b5b5"');
        await queryRunner.query('DROP INDEX "public"."IDX_d8a92c3535ca59bb440327b67e"');
        await queryRunner.query('DROP INDEX "public"."IDX_2a30ce1ff81e758f8f8290b79c"');
        await queryRunner.query('DROP INDEX "public"."IDX_555e87d17838bd1dd574f96fab"');
        await queryRunner.query('DROP INDEX "public"."IDX_fec2aed67163d4a918d9061b5b"');
        await queryRunner.query('ALTER TABLE "organization" DROP CONSTRAINT "UQ_c21e615583a3ebbb0977452afb0"');
        await queryRunner.query('CREATE INDEX "IDX_0b787a42e4569836f006f0b5fd" ON "project_organizations_organization" ("organization_id") ');
        await queryRunner.query('CREATE INDEX "IDX_006d1001ae1f1b2b21f5861807" ON "project_organizations_organization" ("project_id") ');
        await queryRunner.query('CREATE INDEX "IDX_c18e365c071b11e1fc40a60872" ON "parent-organizations" ("organization_id_2") ');
        await queryRunner.query('CREATE INDEX "IDX_09713d56ba671c5cd3eca9f0cb" ON "parent-organizations" ("organization_id_1") ');
        await queryRunner.query('ALTER TABLE "project_organizations_organization" ADD CONSTRAINT "FK_0b787a42e4569836f006f0b5fd2" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "project_organizations_organization" ADD CONSTRAINT "FK_006d1001ae1f1b2b21f58618079" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "parent-organizations" ADD CONSTRAINT "FK_09713d56ba671c5cd3eca9f0cba" FOREIGN KEY ("organization_id_1") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "parent-organizations" ADD CONSTRAINT "FK_c18e365c071b11e1fc40a608722" FOREIGN KEY ("organization_id_2") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
}
