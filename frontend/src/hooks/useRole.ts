import { Role } from '@customTypes/role';

import useSelector from './useSelector';

const useRole = () => {
    const role = useSelector((state) => state.auth.data.role);

    const isAdmin = [Role.Admin].includes(role);
    const isManager = [Role.Manager, Role.Admin].includes(role);

    return {
        isAdmin,
        isManager,
    };
};

export default useRole;
