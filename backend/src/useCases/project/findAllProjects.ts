import { Project, ProjectRepository } from '../../domain/Project';

interface Context {
    projectRepository: ProjectRepository;
}

const findAllProjets = () => async ({ projectRepository }: Context): Promise<Project[]> => projectRepository.find();

export default findAllProjets;
