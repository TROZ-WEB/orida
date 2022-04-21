import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes from '@router/AppRoutes';
import AuthService from '@services/auth';
import { logout } from '@store/auth/actions';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthenticatedRoute = () => {
    const dispatch = useThunkDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // true for optimistic authentication

    useEffect(() => {
        async function checkToken() {
            try {
                const result = await AuthService.me();

                if (result === null) {
                    await dispatch(logout());
                    setIsLoggedIn(false);
                }

                setIsLoggedIn(true);
            } catch (e) {
                setIsLoggedIn(false);
            }
        }

        checkToken();
    }, []);

    return isLoggedIn ? <Outlet /> : <Navigate to={AppRoutes.Login} />;
};

export default AuthenticatedRoute;
