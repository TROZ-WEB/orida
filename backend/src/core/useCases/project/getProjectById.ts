import ProjectDomain, { projectSnapshot } from '../../domain/Project';
import ProjectError, { ProjectErrorType } from '../../errors/ProjectError';
import COREProjectRepository from '../../ports/repositories/COREProjectRepository';

interface Context {
    projectRepository: COREProjectRepository;
}

const getProjectById = (id: string) => async ({ projectRepository }: Context): Promise<ProjectDomain> => {
    const project = await projectRepository.getProjectById(id);

    if (!project) {
        throw new ProjectError(ProjectErrorType.NotFound);
    }

    return projectSnapshot(project);
};

export default getProjectById;
