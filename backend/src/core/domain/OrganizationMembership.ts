/* eslint-disable import/no-cycle */
import Organization from './Organization';
import Role from './Role';
import User from './User';

interface OrganizationMembership {
    id: string;
    user: User;
    organization: Organization;
    role: Role;
}

export default OrganizationMembership;
