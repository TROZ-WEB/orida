class OrganizationError extends Error { }

export default OrganizationError;

export enum OrganizationErrorType {
    AlreadyExists = 'Already exists',
    NotFound = 'Organization not found',
    Unauthorized = 'You can not perform this action as you are not Admin of this Organization',
}
