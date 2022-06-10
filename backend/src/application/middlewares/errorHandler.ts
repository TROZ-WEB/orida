import { NextFunction, Request, Response } from 'express';
import { AuthErrorType } from '../../core/errors/AuthError';
import { OrganizationMembershipErrorType } from '../../core/errors/organizationMembershipError';
import { ProjectContributionErrorType } from '../../core/errors/projectContributionError';

// eslint-disable required because all 4 parameters need to be explicit in order for Express to detect
// it as error handler
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    const errorType = err.message;

    switch (errorType) {
        case ProjectContributionErrorType.AlreadyExists:
        case OrganizationMembershipErrorType.AlreadyExists:
            return res.status(409).send({
                message: 'Conflict: Already exist',
                error: 'Already exist',
            });
        case AuthErrorType.NotLoggedIn:
        case AuthErrorType.Unauthorized:
            return res.status(401).send('Unauthorized');
        default:
            return res.status(500).send({
                message: 'Internal error',
                error: err,
            });
    }
};

export default errorHandler;
