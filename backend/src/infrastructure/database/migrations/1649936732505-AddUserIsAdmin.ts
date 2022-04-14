import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIsAdmin1649936732505 implements MigrationInterface {
    name = 'AddUserIsAdmin1649936732505';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT false;
        `);
        await queryRunner.query(`
            INSERT INTO "user"
                VALUES (
                    '00000000-0000-0000-0000-000000000000',
                    'admin@orida.fr',
                    '$2b$10$dMtoNJcku95HxU5OJFlR8OkR3575.yhDdObgxwYv0jWNjy635IBUK',
                    true
                );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "user"
                WHERE "email"='admin@orida.fr';
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                DROP COLUMN is_admin;
        `);
    }
}
