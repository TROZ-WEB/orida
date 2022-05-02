import { Role } from '@customTypes/role';
import useSelector from '@hooks/useSelector';
import AppRoutes from '@router/AppRoutes';
import AuthService from '@services/auth';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthenticatedRoute = () => {
    const defaultValue = useSelector((state) => state.auth.data.role) === Role.Admin;
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
