import { Request } from 'express';
import { Arg } from '../../core/useCases/organizationMembership/createOrganizationMembership';
import MissingValue from '../errors/missingValue';

const createOrganizationMembershipCommand = (req: Request): Arg => {
    const { userId, organizationId, roleId } = req.body;

    if (!userId) {
        throw new MissingValue('userId');
    }
    if (!organizationId) {
        throw new MissingValue('organizationId');
    }
    if (!roleId) {
        throw new MissingValue('roleId');
    }

    return { userId, organizationId, roleId };
};

export default createOrganizationMembershipCommand;
