import { User } from '../../domain/User';

const isCollaboratorOfOrganization = (user: User, organizationId: string): boolean => {
    const isMember = user.organizationMemberships.find((membership) => membership.organization.id === organizationId);
    if (!isMember) { return false; }

    return isMember.role.label === 'ADMIN' || isMember.role.label === 'COLLABORATOR';
};

export default isCollaboratorOfOrganization;
