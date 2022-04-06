import AuthenticatedRoute from '@components/AuthenticatedRoute';
import NotFound from '@pages/404';
import Home from '@pages/Home';
import Login from '@pages/Login';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AppRoutes from './AppRoutes';

function Router() {
    return (
        <Routes>
            <Route element={<Login />} path={AppRoutes.Login} />
            <Route element={<AuthenticatedRoute />}>
                <Route element={<Home />} path={AppRoutes.Home} />
            </Route>
            <Route element={<NotFound />} path="*" />
        </Routes>
    );
}

export default Router;
