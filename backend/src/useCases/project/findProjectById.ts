import { Repository } from 'typeorm';
import { Project } from '../../domain/Project';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';

interface Context {
    projectRepository: Repository<ProjectEntity>;
}

const findProjectById = (id: string) => async ({ projectRepository }: Context): Promise<Project | null> => {
    const entity = await projectRepository.findOne({ where: { id } });

    return entity ? entity.toDomain() : null;
};

export default findProjectById;
