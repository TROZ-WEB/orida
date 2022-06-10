import ProjectContributionDomain from '../../domain/ProjectContribution';
import COREProjectContributionRepository from '../../ports/repositories/COREProjectContributionRepository';

interface Arg {
    userId: string;
    projectId: string;
    roleId?: string;
}

interface Context {
    projectContributionRepository: COREProjectContributionRepository;
}

const createProjectContribution = ({
    userId,
    projectId,
    roleId,
}: Arg) => async ({
    projectContributionRepository,
}: Context): Promise<ProjectContributionDomain> => {
    const projectContribution = projectContributionRepository.createProjectContribution({
        userId,
        projectId,
        roleId,
    });

    return projectContribution;
};

export default createProjectContribution;
