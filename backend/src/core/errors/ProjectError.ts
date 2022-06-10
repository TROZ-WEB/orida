class ProjectError extends Error { }

export default ProjectError;

export enum ProjectErrorType {
    NotFound = 'Project not found',
}
