import { NextFunction, Request, Response } from 'express';
import AuthError, { AuthErrorType } from '../../core/errors/AuthError';
import isAdmin from '../../core/useCases/auth/isAdmin';
import isAdminOfOrganization from '../../core/useCases/auth/isAdminOfOrganization';

const authorizeOrganizationAdmin = () => (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { organizationId } = req.body; // mandatory

    if (!user) {
        throw new AuthError(AuthErrorType.NotLoggedIn);
    }

    if (!organizationId) {
        throw new AuthError(AuthErrorType.Unauthorized);
    }

    const authorizationGranted = isAdminOfOrganization(user, organizationId);

    if (authorizationGranted || isAdmin(user)) {
        next();

        return;
    }

    throw new AuthError(AuthErrorType.Unauthorized);
};

export default authorizeOrganizationAdmin;
