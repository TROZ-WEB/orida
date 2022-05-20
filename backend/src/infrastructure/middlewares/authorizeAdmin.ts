import { NextFunction, Request, Response } from 'express';
import AuthError, { AuthErrorType } from '../../useCases/auth/AuthError';
import isAdmin from '../../useCases/auth/isAdmin';

const authorizeAdmin = () => (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user) {
        throw new AuthError(AuthErrorType.NotLoggedIn);
    }

    const authorizationGranted = isAdmin(user);

    if (authorizationGranted) {
        next();

        return;
    }

    throw new AuthError(AuthErrorType.Unauthorized);
};

export default authorizeAdmin;
