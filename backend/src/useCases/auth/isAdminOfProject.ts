/* eslint-disable max-len */
import { User } from '../../domain/User';

const isAdminOfProject = (user: User, projectId: string) => {
    // True if user is admin of at least one organization of the project
    const isOrganizationAdmin = user.organizationMemberships.reduce(
        (isAdmin, member) => (member.role.label === 'ADMIN'
                && member.organization.projects.findIndex((project) => project.id === projectId) !== -1
            ? isAdmin
            : false),
        true,
    );

    const isMember = user.projectContributions.find((contribution) => contribution.project.id === projectId);

    return isMember?.role.label === 'ADMIN' || isOrganizationAdmin;
};

export default isAdminOfProject;
