/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Project1649940866843 implements MigrationInterface {
    name = 'Project1649940866843';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "project" (
                "id" uuid NOT NULL,
                "title" character varying NOT NULL,
                "status" character varying NOT NULL,
                CONSTRAINT "PK_project" PRIMARY KEY ("id")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "project"');
    }
}
