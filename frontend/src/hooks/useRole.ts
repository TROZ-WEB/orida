import { Organization } from '@services/organizations';
import { Project } from '@services/projects';
import { User } from '@services/users';
import { initialState } from '@store/auth/types';

import useSelector from './useSelector';

interface UseRoleProps {
    organization?: Organization;
    project?: Project;
}

function computeIsOrganizationAdmin(user: User, organization: Organization): boolean {
    if (user.isAdmin) return true;

    const isMember = user.organizationMemberships.find(
        (membership) => membership.organization.id === organization.id
    );

    if (!isMember) return false;

    return isMember.role.label === 'ADMIN';
}

function computeIsProjectAdmin(user: User, project: Project): boolean {
    if (user.isAdmin) return true;

    // True if user is admin of at least one organization of the project

    const isOrganizationAdmin =
        user.organizationMemberships.length > 0 &&
        user.organizationMemberships.reduce((isOrgaAdmin, membership) => {
            return membership.role.label === 'ADMIN' &&
                membership.organization.projects.findIndex((p) => p.id === project.id) !== -1
                ? isOrgaAdmin
                : false;
        }, true);

    const isMember = user.projectContributions.find(
        (membership) => membership.project.id === project.id
    );

    return isMember?.role.label === 'ADMIN' || isOrganizationAdmin;
}

const useRole = ({ organization, project }: UseRoleProps = {}) => {
    const user = useSelector((state) => state.auth.data);
    const isAuthenticated = user.email !== initialState.data.email;

    const { isAdmin } = user;

    const isAdminOfAtLeastOneOrganization = user.organizationMemberships
        ? user.organizationMemberships.length > 0 || user.isAdmin
        : false;

    const isOrganizationAdmin = organization
        ? computeIsOrganizationAdmin(user, organization)
        : false;

    const isProjectAdmin = project ? computeIsProjectAdmin(user, project) : false;

    return {
        isAdmin,
        isAuthenticated,
        isOrganizationAdmin,
        isProjectAdmin,
        isAdminOfAtLeastOneOrganization,
    };
};

export default useRole;
