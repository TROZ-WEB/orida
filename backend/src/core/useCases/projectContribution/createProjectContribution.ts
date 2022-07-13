import ProjectContributionDomain, { projectContributionSnapshot } from '../../domain/ProjectContribution';
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
    const projectContribution = await projectContributionRepository.createProjectContribution({
        userId,
        projectId,
        roleId,
    });

    return projectContributionSnapshot(projectContribution);
};

export default createProjectContribution;
