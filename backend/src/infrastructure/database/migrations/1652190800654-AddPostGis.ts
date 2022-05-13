/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostGis1652190800654 implements MigrationInterface {
    name = 'AddPostGis1652190800654';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS postgis;');
    }

    public async down(): Promise<void> {
        // do nothing
    }
}
