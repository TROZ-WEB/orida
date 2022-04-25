import { Project, ProjectRepository, ProjectStatus } from '../../domain/Project';

interface Arg {
    title: string;
    description?: string;
    budget?: Number;
    participatoryBudgetYear?: Number;
    startDate?: Date;
    status?: ProjectStatus;
}

interface Context {
    projectRepository: ProjectRepository;
}

const createProject = ({
    budget,
    description,
    participatoryBudgetYear,
    status,
    startDate,
    title,
}: Arg) => async ({ projectRepository }: Context): Promise<Project> => {
    const project = projectRepository.create({
        budget,
        description,
        participatoryBudgetYear,
        status: status || ProjectStatus.Design,
        startDate,
        title,
    });

    return projectRepository.save(project);
};

export default createProject;
