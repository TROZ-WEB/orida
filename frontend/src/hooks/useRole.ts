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

    const isMember = user.projectContributions.find(
        (membership) => membership.project.id === project.id
    );

    if (!isMember) return false;

    return isMember.role.label === 'ADMIN';
}

const useRole = ({ organization, project }: UseRoleProps = {}) => {
    const user = useSelector((state) => state.auth.data);
    const isAuthenticated = user.email !== initialState.data.email;

    const { isAdmin } = user;

    const isAdminOfAtLeastOneOrganization = user.organizationMemberships.length > 0 || user.isAdmin;

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
