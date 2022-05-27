import { Repository } from 'typeorm';
import { ProjectContribution } from '../../domain/ProjectContribution';
import {
    ProjectContribution as ProjectContributionEntity,
} from '../../infrastructure/database/entities/ProjectContribution';

interface Arg {
    userId: string;
    projectId: string;
}

interface Context {
    projectContributionRepository: Repository<ProjectContributionEntity>;
}

const removeContributor = ({
    userId,
    projectId,
}: Arg) => async ({
    projectContributionRepository,
}: Context): Promise<ProjectContribution> => {
    const entity = await projectContributionRepository.findOne({
        where: {
            project: { id: projectId },
            user: { id: userId },
        },
    });

    if (!entity) {
        throw Error('Contribution does not exist');
    }

    await projectContributionRepository.remove([entity]);

    return entity.toDomain();
};

export default removeContributor;
