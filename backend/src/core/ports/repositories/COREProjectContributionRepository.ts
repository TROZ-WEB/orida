/* eslint-disable max-len */
import ProjectContributionDomain from '../../domain/ProjectContribution';

interface createProjectContributionProps {
    userId: string;
    projectId: string;
    roleId?: string;
}

interface deleteProjectContributionProps {
    userId: string;
    projectId: string;
}

interface COREProjectContributionRepository {
    createProjectContribution(projectContributionData: createProjectContributionProps): Promise<ProjectContributionDomain>;
    deleteProjectContribution(projectContributionData: deleteProjectContributionProps): Promise<ProjectContributionDomain>;
    getAllProjectContributions(): Promise<ProjectContributionDomain[]>;
}

export default COREProjectContributionRepository;
