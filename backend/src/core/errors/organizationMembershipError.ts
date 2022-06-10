class OrganizationMembershipError extends Error { }

export default OrganizationMembershipError;

export enum OrganizationMembershipErrorType {
    AlreadyExists = 'Already exists',
    NotFound = 'Organization membership not found',
}
