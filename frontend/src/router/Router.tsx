import AuthenticatedRoute from '@components/AuthenticatedRoute';
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
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    );
}

export default Router;
