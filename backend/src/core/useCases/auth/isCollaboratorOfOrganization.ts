import UserDomain from '../../domain/User';
import isAdmin from './isAdmin';

const isCollaboratorOfOrganization = (user: UserDomain, organizationId: string): boolean => {
    const isMember = user.organizationMemberships.find((membership) => membership.organization.id === organizationId);
    if (!isMember) { return false; }

    return isMember.role.label === 'ADMIN' || isMember.role.label === 'COLLABORATOR' || isAdmin(user);
};

export default isCollaboratorOfOrganization;
