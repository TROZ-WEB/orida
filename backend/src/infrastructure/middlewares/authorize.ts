import { NextFunction, Request, Response } from 'express';
import Role from '../../domain/Role';
import AuthError, { AuthErrorType } from '../../useCases/auth/AuthError';
import isAuthorized from '../../useCases/auth/isAuthorized';

const authorize = (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user) {
        throw Error('Not logged in');
    }

    const authorizationGranted = isAuthorized(user, roles);

    if (authorizationGranted) {
        next();

        return;
    }

    throw new AuthError(AuthErrorType.Unauthorized);
};

export default authorize;
