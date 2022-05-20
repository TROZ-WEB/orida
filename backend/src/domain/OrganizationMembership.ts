/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import { Organization } from './Organization';
import { User } from './User';

class OrganizationMembership {
    id: string;

    user: User;

    organization: Organization;

    constructor(
        user: User,
        organization: Organization,
    ) {
        this.id = uuidv4();
        this.user = user;
        this.organization = organization;
    }
}

export { OrganizationMembership };
