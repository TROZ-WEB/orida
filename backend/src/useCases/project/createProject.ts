import { Repository, In } from 'typeorm';
import { Category } from '../../domain/Category';
import { Project } from '../../domain/Project';
import { projectStatusRepository } from '../../infrastructure/database';
import { Category as CategoryEntity } from '../../infrastructure/database/entities/Category';
import { Organization as OrganizationEntity } from '../../infrastructure/database/entities/Organization';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';
import Position from '../../types/position';

export interface CreateProjectProps {
    budget?: Number;
    categories: Category[];
    description?: string;
    organizations: string[];
    participatoryBudgetYear?: Number;
    location: Position;
    startDate?: Date;
    status: string;
    title: string;
}

interface Context {
    projectRepository: Repository<ProjectEntity>;
    categoryRepository: Repository<CategoryEntity>;
    organizationRepository: Repository<OrganizationEntity>;
}

const createProject = ({
    budget,
    categories,
    description,
    organizations,
    participatoryBudgetYear,
    location,
    startDate,
    status,
    title,
}: CreateProjectProps) => (
    async ({ projectRepository, categoryRepository, organizationRepository }: Context): Promise<Project> => {
        const categoriesData = await categoryRepository.findBy({
            id: In(categories),
        }); // Will execute the query: SELECT * FROM "categories" WHERE "id" IN <categories-ids-array>
        // (doc : https://typeorm.io/find-options)

        const organizationsData = await organizationRepository.findBy({
            id: In(organizations),
        });

        const statusData = await projectStatusRepository.findOne({
            where: { id: status },
        });

        if (!statusData) {
            throw Error('Missing StatusData');
        }

        const project = projectRepository.create({
            budget,
            categories: categoriesData,
            description,
            organizations: organizationsData,
            participatoryBudgetYear,
            startDate,
            status: statusData,
            title,
            location: location
                ? {
                    type: 'Point',
                    coordinates: [location.latitude, location.longitude],
                }
                : undefined,
        });

        const entity = await projectRepository.save(project);

        return entity.toDomain();
    }
);

export default createProject;
