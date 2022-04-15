import { Project, ProjectRepository } from '../../domain/Project';

interface Context {
    projectRepository: ProjectRepository;
}

const findProjects = () => async ({ projectRepository }: Context): Promise<Project[]> => projectRepository.find();

export default findProjects;
