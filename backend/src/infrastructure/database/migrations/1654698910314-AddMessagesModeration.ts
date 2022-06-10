/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessagesModeration1654698910314 implements MigrationInterface {
    name = 'AddMessagesModeration1654698910314';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "messages" ADD "is-moderated" boolean NOT NULL DEFAULT false');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "messages" DROP COLUMN "is-moderated"');
    }
}
