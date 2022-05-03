/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategorySeed1651499489475 implements MigrationInterface {
    name = 'CategorySeed1651499489475';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('INSERT INTO "category" ("id", "label", "color") VALUES (\'00000000-0000-0000-0000-000000000001\', \'livingenvironment\', \'#EF4924\'), (\'00000000-0000-0000-0000-000000000002\', \'culture\', \'#EFD31A\'), (\'00000000-0000-0000-0000-000000000003\', \'education\', \'#EC468B\'), (\'00000000-0000-0000-0000-000000000004\', \'environment\', \'#67BF6B\'), (\'00000000-0000-0000-0000-000000000005\', \'sport\', \'#F36B28\'), (\'00000000-0000-0000-0000-000000000006\', \'cleanliness\', \'#A1CD49\'), (\'00000000-0000-0000-0000-000000000007\', \'transportation\', \'#EE2F44\'), (\'00000000-0000-0000-0000-000000000008\', \'prevention\', \'#915BA6\'), (\'00000000-0000-0000-0000-000000000009\', \'solidarity\', \'#F4AE1A\'), (\'00000000-0000-0000-0000-000000000010\', \'smartcity\', \'#518BC9\'), (\'00000000-0000-0000-0000-000000000011\', \'health\', \'#27BEB6\'), (\'00000000-0000-0000-0000-000000000012\', \'economy\', \'#B856A1\')');
    }

    public async down(): Promise<void> {
        // do nothing
    }
}
