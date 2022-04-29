/// <reference types="./types" />
import * as Sentry from '@sentry/node';
import AppDataSource from './infrastructure/database/index';
import version from './version';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.ENVIRONMENT_NAME,
    release: version ? `orida-backend@${version}` : undefined,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(async () => {
        const { default: app } = await import('./infrastructure/app');

        const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

        app.listen(port, () => {
            console.info(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
