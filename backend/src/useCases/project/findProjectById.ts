import { Project, ProjectRepository } from '../../domain/Project';

interface Context {
    projectRepository: ProjectRepository;
}

const findProjectById = (id: string) => async ({ projectRepository }: Context): Promise<Project | undefined> => (
    projectRepository.findOne({ id })
);

export default findProjectById;
