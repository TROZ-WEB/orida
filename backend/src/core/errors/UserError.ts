class UserError extends Error { }

export default UserError;

export enum UserErrorType {
    NotFound = 'User not found',
}
