/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
import Organization, { organizationSnapshot } from './Organization';
import Role, { roleSnapshot } from './Role';
import User, { userSnapshot } from './User';

interface OrganizationMembership {
    id: string;
    user: User;
    organization: Organization;
    role: Role;
}

export const organizationMembershipSnapshot = (organizationMembership: OrganizationMembership): OrganizationMembership => Object.freeze({
    ...organizationMembership,
    user: userSnapshot(organizationMembership.user),
    organization: organizationSnapshot(organizationMembership.organization),
    role: roleSnapshot(organizationMembership.role),
});

export default OrganizationMembership;
