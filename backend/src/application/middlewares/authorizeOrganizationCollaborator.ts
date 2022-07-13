import { NextFunction, Request, Response } from 'express';
import { isAdmin, isCollaboratorOfOrganization } from '../../core/domain/User';
import AuthError, { AuthErrorType } from '../../core/errors/AuthError';

const authorizeOrganisationCollaborator = () => (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { organizationId } = req.body; // mandatory

    if (!user) {
        throw new AuthError(AuthErrorType.NotLoggedIn);
    }

    if (!organizationId) {
        throw new AuthError(AuthErrorType.Unauthorized);
    }

    const authorizationGranted = isCollaboratorOfOrganization(user, organizationId);

    if (authorizationGranted || isAdmin(user)) {
        next();

        return;
    }

    throw new AuthError(AuthErrorType.Unauthorized);
};

export default authorizeOrganisationCollaborator;
