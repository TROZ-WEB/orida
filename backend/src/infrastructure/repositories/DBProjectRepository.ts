/* eslint-disable max-len */
import { Between, FindOptionsWhere, ILike, In } from 'typeorm';
import ProjectDomain from '../../core/domain/Project';
import AuthError, { AuthErrorType } from '../../core/errors/AuthError';
import ProjectError, { ProjectErrorType } from '../../core/errors/ProjectError';
import StatusError, { StatusErrorType } from '../../core/errors/StatusError';
import COREProjectRepository from '../../core/ports/repositories/COREProjectRepository';
import isAdmin from '../../core/useCases/auth/isAdmin';
import CategoryEntity from '../database/entities/Category.entity';
// import ImageEntity from '../database/entities/Image.entity';
import OrganizationEntity from '../database/entities/Organization.entity';
import ProjectEntity from '../database/entities/Project.entity';
import ProjectStatusEntity from '../database/entities/ProjectStatus.entity';

const createProject: COREProjectRepository['createProject'] = async ({
    auth,
    budget,
    categories,
    description,
    organizations,
    participatoryBudgetYear,
    location,
    // images,
    startDate,
    statusId,
    title,
}): Promise<ProjectDomain> => {
    // Verify if auth is in all the organizations linked to the project, or is Orida
    const organisationsOfAuth = auth.organizationMemberships.map((o) => o.organization.id);
    const isAuthAuthorized = organizations.length > 0 && organizations.reduce((acc, val) => (organisationsOfAuth.includes(val) ? acc : false), true);
    if (!isAuthAuthorized && !isAdmin(auth)) { throw new AuthError(AuthErrorType.Unauthorized); }

    const categoriesData = await CategoryEntity.findBy({
        id: In(categories),
    }); // Will execute the query: SELECT * FROM "categories" WHERE "id" IN <categories-ids-array>
    // (doc : https://typeorm.io/find-options)

    const organizationsData = await OrganizationEntity.findBy({
        id: In(organizations),
    });

    const statusData = await ProjectStatusEntity.findOne({
        where: { id: statusId },
    });

    if (!statusData) {
        throw new StatusError(StatusErrorType.NotFound);
    }

    const project = ProjectEntity.create({
        budget,
        description,
        participatoryBudgetYear,
        startDate,
        categories: categoriesData,
        organizations: organizationsData,
        status: statusData,
        title,
        location: location
            ? {
                type: 'Point',
                coordinates: [location.latitude, location.longitude],
            }
            : undefined,
    });

    const saved = await ProjectEntity.save(project);

    // if (images && images?.length > 0) {
    //     const imagesArray = images.map((url) => ({ url, project }));

    //     await ImageEntity.save(imagesArray);
    // }

    // createProjectContribution({
    //     userId: auth.id,
    //     projectId: saved.id,
    //     roleId: '00000000-0000-0000-0000-000000000001',
    // })({
    //     projectContributionRepository,
    // });

    return saved.toDomain();
};

const updateProject: COREProjectRepository['updateProject'] = async ({
    id,
    budget,
    categories,
    description,
    location,
    participatoryBudgetYear,
    startDate,
    statusId,
    title,
}): Promise<ProjectDomain> => {
    const existingProject = await ProjectEntity.findOneBy({ id });

    if (!existingProject) {
        throw new ProjectError(ProjectErrorType.NotFound);
    }

    const categoriesData = await CategoryEntity.findBy({
        id: In(categories),
    }); // Will execute the query: SELECT * FROM "categories" WHERE "id" IN <categories-ids-array>
        // (doc : https://typeorm.io/find-options)

    const statusData = await ProjectStatusEntity.findOne({
        where: { id: statusId },
    });

    if (!statusData) {
        throw new StatusError(StatusErrorType.NotFound);
    }

    const project = ProjectEntity.create({
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

    const entity = await ProjectEntity.save(project);

    return entity.toDomain();
};

const createProjectImages: COREProjectRepository['createProjectImages'] = async ({
    id,
    // images,
}): Promise<ProjectDomain> => {
    const existingProject = await ProjectEntity.findOneBy({ id });

    if (!existingProject) {
        throw new ProjectError(ProjectErrorType.NotFound);
    }

    // if (images && images?.length > 0) {
    //     const imagesArray = images.map((url) => ({ project: existingProject, url }));

    //     await ImageEntity.save(imagesArray);
    // }

    return existingProject.toDomain();
};

const getProjectBySearch: COREProjectRepository['getProjectBySearch'] = async ({
    search,
    status,
    categories,
    budgets,
}): Promise<ProjectDomain[]> => {
    let orCondition: any[] = [];
    const andCondition: FindOptionsWhere<ProjectEntity> = {};

    if (search) {
        andCondition.title = ILike(`%${search}%`);
    }

    if (categories && categories.length !== 0) {
        andCondition.categories = {
            id: In(categories),
        };
    }

    if (status && status.length !== 0) {
        andCondition.status = {
            id: In(status),
        };
    }

    if (budgets && budgets.length !== 0) {
        // if several budgets are selected, build a OR condition to wrap them all
        // an AND condition with a nested OR condition need to copy every AND condition into the OR
        // SOURCE: https://stackoverflow.com/a/67485255
        orCondition = budgets.map((budget) => ({
            ...andCondition,
            budget: Between(budget.min, budget.max),
        }));
    }

    const projects = await ProjectEntity.find({
        where: orCondition.length !== 0
            ? orCondition
            : andCondition,
    });

    return projects.map((project) => project.toDomain());
};

const getAllProjects: COREProjectRepository['getAllProjects'] = async (): Promise<ProjectDomain[]> => {
    const projects = await ProjectEntity.find();

    return projects.map((project) => project.toDomain());
};

const getProjectById: COREProjectRepository['getProjectById'] = async (id: string): Promise<ProjectDomain | undefined> => {
    const project = await ProjectEntity.findOne({
        where: { id },
        relations: {
            posts: {
                poll: {
                    responses: {
                        user: true,
                    },
                },
                thread: {
                    messages: false,
                },
            },
            organizations: {
                members: {
                    user: true,
                },
            },
            contributors: {
                project: {
                    status: true,
                },
            },
            images: true,
        },
    });

    return project ? project.toDomain() : undefined;
};

export default { createProject, updateProject, createProjectImages, getAllProjects, getProjectById, getProjectBySearch };
