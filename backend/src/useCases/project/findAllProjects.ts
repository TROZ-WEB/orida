/* eslint-disable max-len */
import { Repository } from 'typeorm';
import { Project } from '../../domain/Project';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';

interface Context {
    projectRepository: Repository<ProjectEntity>
}

const findAllProjets = () => async ({ projectRepository }: Context): Promise<Project[]> => {
    const entities = await projectRepository.find({ relations: { categories: true } });

    return entities.map((entity) => entity.toDomain());
};

export default findAllProjets;
