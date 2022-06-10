/* eslint-disable max-len */
import ProjectContributionDomain from '../../domain/ProjectContribution';
import COREProjectContributionRepository from '../../ports/repositories/COREProjectContributionRepository';

interface Context {
    projectContributionRepository: COREProjectContributionRepository
}

const getAllProjectContributions = () => async ({ projectContributionRepository }: Context): Promise<ProjectContributionDomain[]> => {
    const projectContributions = await projectContributionRepository.getAllProjectContributions();

    return projectContributions;
};

export default getAllProjectContributions;
