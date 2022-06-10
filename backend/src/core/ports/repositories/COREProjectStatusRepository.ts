import ProjectStatusDomain from '../../domain/ProjectStatus';

interface COREProjectStatusRepository {
    getAllProjectStatutes(): Promise<ProjectStatusDomain[]>;
}

export default COREProjectStatusRepository;
