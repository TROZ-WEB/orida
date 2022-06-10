/* eslint-disable max-len */
import CategoryDomain from '../../domain/Category';
import ProjectDomain from '../../domain/Project';
import UserDomain from '../../domain/User';
import ProjectError, { ProjectErrorType } from '../../errors/ProjectError';
import COREProjectRepository from '../../ports/repositories/COREProjectRepository';
import Position from '../../types/Position';

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

        if (!project) {
            throw new ProjectError(ProjectErrorType.NotFound);
        }

        return project;
    }
);

export default createProject;
