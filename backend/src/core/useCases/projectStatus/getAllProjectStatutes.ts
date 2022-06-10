import ProjectStatusDomain from '../../domain/ProjectStatus';
import COREProjectStatusRepository from '../../ports/repositories/COREProjectStatusRepository';

interface Context {
    projectStatusRepository: COREProjectStatusRepository;
}

const getAllProjectStatuses = () => (
    async ({ projectStatusRepository }: Context): Promise<ProjectStatusDomain[]> => {
        const projectStatutes = await projectStatusRepository.getAllProjectStatutes();

        return projectStatutes;
    }
);

export default getAllProjectStatuses;
