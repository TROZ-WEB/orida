import Loader from '@design/Loader';
import useThunkDispatch from '@hooks/useThunkDispatch';
import AppRoutes from '@router/AppRoutes';
import AuthService from '@services/auth';
import { logout } from '@store/auth/actions';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AuthenticatedRoute() {
    const dispatch = useThunkDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        async function checkToken() {
            try {
                const result = await AuthService.me();

                if (result === null) {
                    await dispatch(logout());
                    setIsLoggedIn(false);
                    setLoading(false);
                }

                setIsLoggedIn(true);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                setLoading(false);
            }
        }

        checkToken();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to={AppRoutes.Login} />;
}

export default AuthenticatedRoute;