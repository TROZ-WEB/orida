/* eslint-disable max-len */
import { Repository } from 'typeorm';
import { ProjectContribution } from '../../domain/ProjectContribution';
import { ProjectContribution as ProjectContributionEntity } from '../../infrastructure/database/entities/ProjectContribution';

interface Context {
    projectContributionRepository: Repository<ProjectContributionEntity>
}

const findAllContributors = () => async ({ projectContributionRepository }: Context): Promise<ProjectContribution[]> => {
    const entities = await projectContributionRepository.find();

    return entities.map((entity) => entity.toDomain());
};

export default findAllContributors;
