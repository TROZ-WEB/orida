import { NextFunction, Request, Response } from 'express';
import AuthError, { AuthErrorType } from '../../useCases/auth/AuthError';
import isAdminOfProject from '../../useCases/auth/isAdminOfProject';

const authorizeProjectAdmin = () => (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const projectId = req.body.project; // mandatory

    if (!user) {
        throw new AuthError(AuthErrorType.NotLoggedIn);
    }

    if (!projectId) {
        throw new AuthError(AuthErrorType.Unauthorized);
    }

    const authorizationGranted = isAdminOfProject(user, projectId);

    if (authorizationGranted) {
        next();

        return;
    }

    throw new AuthError(AuthErrorType.Unauthorized);
};

export default authorizeProjectAdmin;
