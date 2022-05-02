import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category as CategoryEntity } from './entities/Category';
import { Project as ProjectEntity } from './entities/Project';
import { ProjectStatusEntity } from './entities/ProjectStatus';

const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [`${__dirname}/entities/*.ts`],
    migrations: [`${__dirname}/migrations/*.ts`],
    logging: false,
    entitySkipConstructor: true,
    namingStrategy: new SnakeNamingStrategy(),
});

export const categoryRepository = AppDataSource.getRepository<CategoryEntity>(CategoryEntity);
export const projectRepository = AppDataSource.getRepository<ProjectEntity>(ProjectEntity);
export const projectStatusRepository = AppDataSource.getRepository<ProjectStatusEntity>(ProjectStatusEntity);

export default AppDataSource;
