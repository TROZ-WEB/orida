import { NextFunction, Request, Response } from 'express';
import AuthError, { AuthErrorType } from '../../core/errors/AuthError';
import isAdmin from '../../core/useCases/auth/isAdmin';

const authorizeAdminOfAllProjectOrganizations = () => (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { organizations } = req.body; // mandatory

    if (!user) {
        throw new AuthError(AuthErrorType.NotLoggedIn);
    }

    const organisationsOfAuth = user.organizationMemberships.map((o) => o.organization.id);
    const isAuthAuthorized = organizations.length > 0 && organizations.reduce(
        (acc: boolean, organizationId:string) => (organisationsOfAuth.includes(organizationId) ? acc : false),
        true,
    );

    if (isAuthAuthorized || isAdmin(user)) {
        next();

        return;
    }

    throw new AuthError(AuthErrorType.Unauthorized);
};

export default authorizeAdminOfAllProjectOrganizations;
