import { Organization } from '@services/organizations';
import { User } from '@services/users';
import { initialState } from '@store/auth/types';

import useSelector from './useSelector';

interface UseRoleProps {
    organization?: Organization;
}

function computeIsOrganizationAdmin(user: User, organization: Organization): boolean {
    if (user.isAdmin) return true;

    const isMember = user.organizationMemberships.find(
        (membership) => membership.organization.id === organization.id
    );

    if (!isMember) return false;

    return isMember.role.label === 'ADMIN';
}

const useRole = ({ organization }: UseRoleProps = {}) => {
    const user = useSelector((state) => state.auth.data);

    const isAuthenticated = user.email !== initialState.data.email;

    const { isAdmin } = user;

    const isOrganizationAdmin = organization
        ? computeIsOrganizationAdmin(user, organization)
        : false;

    return {
        isAdmin,
        isAuthenticated,
        isOrganizationAdmin,
    };
};

export default useRole;
