import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes from '@router/AppRoutes';
import AuthService from '@services/auth';
import { logout } from '@store/auth/actions';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const AuthenticatedRoute = () => {
    const dispatch = useThunkDispatch();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // true for optimistic authentication

    const forceLogout = () => {
        dispatch(logout());
        navigate(AppRoutes.Login);
    };

    useEffect(() => {
        async function checkToken() {
            try {
                const result = await AuthService.getAuth();

                if (result === null) {
                    setIsLoggedIn(false);
                    forceLogout();
                }

                setIsLoggedIn(true);
            } catch (e) {
                setIsLoggedIn(false);
                forceLogout();
            }
        }

        checkToken();
    }, []);

    return isLoggedIn ? <Outlet /> : <Navigate to={AppRoutes.Login} />;
};

export default AuthenticatedRoute;
