import ProjectContributionDomain, { projectContributionSnapshot } from '../../domain/ProjectContribution';
import ProjectContributionError, { ProjectContributionErrorType } from '../../errors/projectContributionError';
import COREProjectContributionRepository from '../../ports/repositories/COREProjectContributionRepository';

interface Arg {
    userId: string;
    projectId: string;
}

interface Context {
    projectContributionRepository: COREProjectContributionRepository;
}

const deleteProjectContribution = ({
    userId,
    projectId,
}: Arg) => async ({
    projectContributionRepository,
}: Context): Promise<ProjectContributionDomain> => {
    const projectContribution = await projectContributionRepository.deleteProjectContribution({ userId, projectId });

    if (!projectContribution) {
        throw new ProjectContributionError(ProjectContributionErrorType.NotFound);
    }

    return projectContributionSnapshot(projectContribution);
};

export default deleteProjectContribution;
