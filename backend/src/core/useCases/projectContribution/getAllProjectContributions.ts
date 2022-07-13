/* eslint-disable max-len */
import ProjectContributionDomain, { projectContributionSnapshot } from '../../domain/ProjectContribution';
import COREProjectContributionRepository from '../../ports/repositories/COREProjectContributionRepository';

interface Context {
    projectContributionRepository: COREProjectContributionRepository
}

const getAllProjectContributions = () => async ({ projectContributionRepository }: Context): Promise<ProjectContributionDomain[]> => {
    const projectContributions = await projectContributionRepository.getAllProjectContributions();

    return projectContributions.map(projectContributionSnapshot);
};

export default getAllProjectContributions;
