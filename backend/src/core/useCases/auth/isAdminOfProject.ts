import UserDomain from '../../domain/User';
import isAdmin from './isAdmin';

const isAdminOfProject = (user: UserDomain, projectId: string) => {
    // True if user is admin of at least one organization of the project
    const isOrganizationAdmin = user.organizationMemberships.length > 0 && user.organizationMemberships.reduce(
        (isOrgaAdmin, member) => (member.role.label === 'ADMIN'
                && member.organization.projects.findIndex((project) => project.id === projectId) !== -1
            ? isOrgaAdmin
            : false),
        true,
    );

    const isMember = user.projectContributions.find((contribution) => contribution.project.id === projectId);

    return isMember?.role.label === 'ADMIN' || isOrganizationAdmin || isAdmin(user);
};

export default isAdminOfProject;
