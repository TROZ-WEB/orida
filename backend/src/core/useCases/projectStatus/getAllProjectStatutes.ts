import ProjectStatusDomain, { projectStatusSnapshot } from '../../domain/ProjectStatus';
import COREProjectStatusRepository from '../../ports/repositories/COREProjectStatusRepository';

interface Context {
    projectStatusRepository: COREProjectStatusRepository;
}

const getAllProjectStatuses = () => (
    async ({ projectStatusRepository }: Context): Promise<ProjectStatusDomain[]> => {
        const projectStatutes = await projectStatusRepository.getAllProjectStatutes();

        return projectStatutes.map(projectStatusSnapshot);
    }
);

export default getAllProjectStatuses;
