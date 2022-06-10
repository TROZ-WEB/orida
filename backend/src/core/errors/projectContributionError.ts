class ProjectContributionError extends Error { }

export default ProjectContributionError;

export enum ProjectContributionErrorType {
    AlreadyExists = 'Already Exists',
    NotFound = 'Project contribution not found',
}
