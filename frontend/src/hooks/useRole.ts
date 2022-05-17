import { Role } from '@customTypes/role';
import { initialState } from '@store/auth/types';

import useSelector from './useSelector';

const useRole = () => {
    const role = useSelector((state) => state.auth.data.role);
    const isAuthenticated =
        useSelector((state) => state.auth.data.email) !== initialState.data.email;

    const isAdmin = [Role.Admin].includes(role);
    const isManager = [Role.Manager, Role.Admin].includes(role);

    return {
        isAdmin,
        isAuthenticated,
        isManager,
    };
};

export default useRole;
