/* eslint-disable max-len */
import ProjectStatusDomain from '../../core/domain/ProjectStatus';
import COREProjectStatusRepository from '../../core/ports/repositories/COREProjectStatusRepository';
import ProjectStatusEntity from '../database/entities/ProjectStatus.entity';

const getAllProjectStatutes: COREProjectStatusRepository['getAllProjectStatutes'] = async (): Promise<ProjectStatusDomain[]> => {
    const projectStatutes = await ProjectStatusEntity.find();

    return projectStatutes.map((projectStatus) => projectStatus.toDomain());
};

export default { getAllProjectStatutes };
