import React, { PropsWithChildren, useEffect, useState } from "react";
import { IndexRouteProps, LayoutRouteProps, Navigate, Outlet, PathRouteProps } from "react-router-dom";
import AppRoutes from "@router/AppRoutes";
import Loader from "@design/Loader";
import useSelector from "@hooks/useSelector";
import AuthService from "@services/auth";

function AuthenticatedRoute({ children, ...rest }: PropsWithChildren<PathRouteProps | LayoutRouteProps | IndexRouteProps>) {
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
