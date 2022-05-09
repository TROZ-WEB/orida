class AuthError extends Error {}

export default AuthError;

export enum AuthErrorType {
    IncorrectUsername = 'Incorrect username.',
    IncorrectPassword = 'Incorrect password.',
    RegisterEmailAlreadyInUse = 'Email already in use',
    RegisterUnknownError = 'Internal Error',
    Unauthorized = 'Unauthorized',
    NotLoggedIn = 'Not logged in',
}
