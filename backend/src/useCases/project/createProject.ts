/* eslint-disable max-len */
import { Repository, In } from 'typeorm';
import { Category } from '../../domain/Category';
import { Project } from '../../domain/Project';
import { User } from '../../domain/User';
import { projectStatusRepository, projectContributionRepository, roleRepository, userRepository, imageRepository } from '../../infrastructure/database';
import { Category as CategoryEntity } from '../../infrastructure/database/entities/Category';
import { Organization as OrganizationEntity } from '../../infrastructure/database/entities/Organization';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';
import Position from '../../types/position';
import AuthError, { AuthErrorType } from '../auth/AuthError';
import isAdmin from '../auth/isAdmin';
import StatusError, { StatusErrorType } from '../status/statusError';
import addContributor from './addContributor';

export interface CreateProjectProps {
    auth: User;
    budget?: Number;
    categories: Category[];
    description?: string;
    organizations: string[];
    participatoryBudgetYear?: Number;
    location: Position;
    images?: string[];
    startDate?: Date;
    statusId: string;
    title: string;
}

interface Context {
    projectRepository: Repository<ProjectEntity>;
    categoryRepository: Repository<CategoryEntity>;
    organizationRepository: Repository<OrganizationEntity>;
}

const createProject = ({
    auth,
    budget,
    categories,
    description,
    organizations,
    participatoryBudgetYear,
    location,
    images,
    startDate,
    statusId,
    title,
}: CreateProjectProps) => (
    async ({ projectRepository, categoryRepository, organizationRepository }: Context): Promise<Project> => {
        // Verify if auth is in all the organizations linked to the project, or is Orida
        const organisationsOfAuth = auth.organizationMemberships.map((o) => o.organization.id);
        const isAuthAuthorized = organizations.length > 0 && organizations.reduce((acc, val) => (organisationsOfAuth.includes(val) ? acc : false), true);
        if (!isAuthAuthorized && !isAdmin(auth)) { throw new AuthError(AuthErrorType.Unauthorized); }

        const categoriesData = await categoryRepository.findBy({
            id: In(categories),
        }); // Will execute the query: SELECT * FROM "categories" WHERE "id" IN <categories-ids-array>
        // (doc : https://typeorm.io/find-options)

        const organizationsData = await organizationRepository.findBy({
            id: In(organizations),
        });

        const statusData = await projectStatusRepository.findOne({
            where: { id: statusId },
        });

        if (!statusData) {
            throw new StatusError(StatusErrorType.NotFound);
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

        if (images && images?.length > 0) {
            const imagesArray = images.map((url) => ({ project, url }));

            await imageRepository.save(imagesArray);
        }

        addContributor({
            userId: auth.id,
            projectId: entity.id,
            roleId: '00000000-0000-0000-0000-000000000001',
        })({
            projectContributionRepository,
            projectRepository,
            roleRepository,
            userRepository,
        });

        return entity.toDomain();
    }
);

export default createProject;
