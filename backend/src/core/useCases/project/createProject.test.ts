/* eslint-disable max-len */
import CategoryDomain from '../../domain/Category';
import ProjectDomain, { Position } from '../../domain/Project';
import UserDomain from '../../domain/User';
import ProjectError, { ProjectErrorType } from '../../errors/ProjectError';
// import COREProjectContributionRepository from '../../ports/repositories/COREProjectContributionRepository';
import COREProjectRepository from '../../ports/repositories/COREProjectRepository';

export interface Arg {
    auth: UserDomain;
    budget?: Number;
    categories: CategoryDomain[];
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
    projectRepository: COREProjectRepository;
    // projectContributionRepository: COREProjectContributionRepository;
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
}: Arg) => (
    async ({ projectRepository }: Context): Promise<ProjectDomain> => {
        const project = projectRepository.createProject({
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
        });

        // const contribution = projectContributionRepository.createProjectContribution()

        if (!project) {
            throw new ProjectError(ProjectErrorType.NotFound);
        }

        return project;
    }
);

export default createProject;
