import ProjectDomain, { projectSnapshot } from '../../domain/Project';
import COREProjectRepository from '../../ports/repositories/COREProjectRepository';

interface Context {
    projectRepository: COREProjectRepository
}

const getAllProjects = () => async ({ projectRepository }: Context): Promise<ProjectDomain[]> => {
    const projects = await projectRepository.getAllProjects();

    return projects.map(projectSnapshot);
};

export default getAllProjects;
