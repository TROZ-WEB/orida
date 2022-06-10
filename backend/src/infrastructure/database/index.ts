/* eslint-disable max-len */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [`${__dirname}/entities/*.{js,ts}`],
    migrations: [`${__dirname}/migrations/*.{js,ts}`, `${__dirname}/seeds/*.{js,ts}`],
    logging: false,
    entitySkipConstructor: true,
    namingStrategy: new SnakeNamingStrategy(),
});

export default AppDataSource;
