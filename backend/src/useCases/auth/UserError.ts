class UserError extends Error {
}

export default UserError;

export enum UserErrorType {
    RegisterEmailAlreadyInUse = 'Email already in use',
    RegisterUnknownError = 'Internal Error',
}
