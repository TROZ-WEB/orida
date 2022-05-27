class OrganizationError extends Error { }

export default OrganizationError;

export enum OrganizationErrorType {
    NotFound = 'Organization not found',
    Unauthorized = 'You can not perform this action as you are not Admin of this Organization',
}
