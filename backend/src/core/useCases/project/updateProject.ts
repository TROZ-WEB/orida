/* eslint-disable max-len */
import CategoryDomain from '../../domain/Category';
import ProjectDomain from '../../domain/Project';
import ProjectError, { ProjectErrorType } from '../../errors/ProjectError';
import COREProjectRepository from '../../ports/repositories/COREProjectRepository';
import Position from '../../types/Position';

interface Arg {
    id:string;
    budget?: Number;
    categories: CategoryDomain[];
    description?: string;
    participatoryBudgetYear?: Number;
    startDate?: Date;
    statusId: string;
    title: string;
    location: Position;
}

interface Context {
    projectRepository: COREProjectRepository;
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
}: Arg) => (
    async ({ projectRepository }: Context): Promise<ProjectDomain> => {
        const project = await projectRepository.updateProject({
            id,
            budget,
            categories,
            description,
            location,
            participatoryBudgetYear,
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

export default updateProject;
