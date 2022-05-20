import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category as CategoryEntity } from './entities/Category';
import { Organization as OrganizationEntity } from './entities/Organization';
import { OrganizationMembership as OrganizationMembershipEntity } from './entities/OrganizationMembership';
import { Poll as PollEntity } from './entities/Poll';
import { PollResponse as PollResponseEntity } from './entities/PollResponse';
import { Post as PostEntity } from './entities/Post';
import { Project as ProjectEntity } from './entities/Project';
import { ProjectStatusEntity } from './entities/ProjectStatus';
import { Thread as ThreadEntity } from './entities/Thread';
import { User as UserEntity } from './entities/User';

const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [`${__dirname}/entities/*.{js,ts}`],
    migrations: [`${__dirname}/migrations/*.{js,ts}`, `${__dirname}/seeds/*.{js,ts}`],
    logging: false,
    entitySkipConstructor: true,
    namingStrategy: new SnakeNamingStrategy(),
});

export const categoryRepository = AppDataSource.getRepository<CategoryEntity>(CategoryEntity);
export const organizationRepository = AppDataSource.getRepository<OrganizationEntity>(OrganizationEntity);
export const organizationMembershipRepository = (
    AppDataSource.getRepository<OrganizationMembershipEntity>(OrganizationMembershipEntity)
);
export const pollRepository = AppDataSource.getRepository<PollEntity>(PollEntity);
export const pollResponseRepository = AppDataSource.getRepository<PollResponseEntity>(PollResponseEntity);
export const postRepository = AppDataSource.getRepository<PostEntity>(PostEntity);
export const projectRepository = AppDataSource.getRepository<ProjectEntity>(ProjectEntity);
export const projectStatusRepository = AppDataSource.getRepository<ProjectStatusEntity>(ProjectStatusEntity);
export const threadRepository = AppDataSource.getRepository<ThreadEntity>(ThreadEntity);
export const userRepository = AppDataSource.getRepository<UserEntity>(UserEntity);

export default AppDataSource;
