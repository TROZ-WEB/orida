import Loader from '@design/Loader';
import AppRoutes from '@router/AppRoutes';
import AuthService from '@services/auth';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AuthenticatedRoute() {
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        async function checkToken() {
            try {
                const result = await AuthService.me();

                if (result === null) {
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
