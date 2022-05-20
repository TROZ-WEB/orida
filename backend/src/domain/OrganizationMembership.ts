/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import { Organization } from './Organization';
import { Role } from './Role';
import { User } from './User';

class OrganizationMembership {
    id: string;

    user: User;

    organization: Organization;

    role: Role;

    constructor(
        user: User,
        organization: Organization,
        role: Role,
    ) {
        this.id = uuidv4();
        this.user = user;
        this.organization = organization;
        this.role = role;
    }
}

export { OrganizationMembership };
