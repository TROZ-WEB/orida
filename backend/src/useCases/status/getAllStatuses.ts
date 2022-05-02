import { Repository } from 'typeorm';
import { ProjectStatus } from '../../domain/ProjectStatus';
import { ProjectStatusEntity } from '../../infrastructure/database/entities/ProjectStatus';

interface Context {
    projectStatusRepository: Repository<ProjectStatusEntity>;
}

const getAllStatuses = () => (
    async ({ projectStatusRepository }: Context): Promise<ProjectStatus[]> => {
        const entities = await projectStatusRepository.find();

        return entities.map((entity) => entity.toDomain());
    }
);

export default getAllStatuses;
