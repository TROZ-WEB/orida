import { User } from '../../domain/User';

const isAdminOfOrganization = (user: User, organizationId: string): boolean => {
    const isMember = user.organizationMemberships.find((membership) => membership.organization.id === organizationId);
    if (!isMember) { return false; }

    return isMember.role.label === 'ADMIN';
};

export default isAdminOfOrganization;
