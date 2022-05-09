import { Role } from '@customTypes/role';
import useRole from '@hooks/useRole';
import AppRoutes from '@router/AppRoutes';
import AuthService from '@services/auth';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthenticatedRoute = () => {
    const { isAdmin: defaultValue } = useRole();
    const [isAdmin, setIsAdmin] = useState<boolean>(defaultValue); // optimistic validation based on state

    useEffect(() => {
        async function checkToken() {
            try {
                const result = await AuthService.me();

                if (!(result?.role === Role.Admin)) {
                    throw Error('Unauthorized');
                }

                setIsAdmin(true);
            } catch (e) {
                setIsAdmin(false);
            }
        }

        checkToken();
    }, []);

    return isAdmin ? <Outlet /> : <Navigate to={AppRoutes.Home} />;
};

export default AuthenticatedRoute;
