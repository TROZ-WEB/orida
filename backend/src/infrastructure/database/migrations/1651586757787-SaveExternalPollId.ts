/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SaveExternalPollId1651586757787 implements MigrationInterface {
    name = 'SaveExternalPollId1651586757787';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "poll" ADD "external_poll_id" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE "poll" ADD CONSTRAINT "UQ_f952a495f6fa74ea8e198a3a16e" UNIQUE ("external_poll_id")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "poll" DROP CONSTRAINT "UQ_f952a495f6fa74ea8e198a3a16e"');
        await queryRunner.query('ALTER TABLE "poll" DROP COLUMN "external_poll_id"');
    }
}
