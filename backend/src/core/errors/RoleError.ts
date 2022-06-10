class RoleError extends Error { }

export default RoleError;

export enum RoleErrorType {
    NotFound = 'Role not found',
}
