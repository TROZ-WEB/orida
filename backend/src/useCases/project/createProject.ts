import { Project, ProjectRepository, ProjectStatus } from '../../domain/Project';

interface Arg {
    title: string;
}

interface Context {
    projectRepository: ProjectRepository;
}

const createProject = ({ title }: Arg) => async ({ projectRepository }: Context): Promise<Project> => {
    const project = projectRepository.create({
        title,
        status: ProjectStatus.Design,
    });

    return projectRepository.save(project);
};

export default createProject;
