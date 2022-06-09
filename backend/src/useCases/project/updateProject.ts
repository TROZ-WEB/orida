/* eslint-disable max-len */
import { Repository, In } from 'typeorm';
import { Category } from '../../domain/Category';
import { Project } from '../../domain/Project';
import { User } from '../../domain/User';
import { projectStatusRepository } from '../../infrastructure/database';
import { Category as CategoryEntity } from '../../infrastructure/database/entities/Category';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';
import Position from '../../types/position';
import StatusError, { StatusErrorType } from '../status/statusError';
import ProjectError, { ProjectErrorType } from './projectError';

export interface UpdateProjectProps {
    id:string;
    auth: User;
    budget?: Number;
    categories: Category[];
    description?: string;
    participatoryBudgetYear?: Number;
    startDate?: Date;
    statusId: string;
    title: string;
    location: Position;
}

interface Context {
    projectRepository: Repository<ProjectEntity>;
    categoryRepository: Repository<CategoryEntity>;
}

const updateProject = ({
    id,
    budget,
    categories,
    description,
    location,
    participatoryBudgetYear,
    startDate,
    statusId,
    title,
}: UpdateProjectProps) => (
    async ({ projectRepository, categoryRepository }: Context): Promise<Project> => {
        const existingProject = await projectRepository.findOneBy({ id });

        if (!existingProject) {
            throw new ProjectError(ProjectErrorType.NotFound);
        }

        const categoriesData = await categoryRepository.findBy({
            id: In(categories),
        }); // Will execute the query: SELECT * FROM "categories" WHERE "id" IN <categories-ids-array>
        // (doc : https://typeorm.io/find-options)

        const statusData = await projectStatusRepository.findOne({
            where: { id: statusId },
        });

        if (!statusData) {
            throw new StatusError(StatusErrorType.NotFound);
        }

        const project = projectRepository.create({
            id,
            budget,
            categories: categoriesData,
            description,
            participatoryBudgetYear,
            startDate,
            status: statusData,
            title,
            organizations: existingProject.organizations,
            posts: existingProject.posts,
            contributors: existingProject.contributors,
            location: location
                ? {
                    type: 'Point',
                    coordinates: [location.latitude, location.longitude],
                }
                : existingProject.location,
        });

        const entity = await projectRepository.save(project);

        return entity.toDomain();
    }
);

export default updateProject;
