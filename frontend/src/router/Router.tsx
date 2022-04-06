import Home from '@pages/Home';
import Login from '@pages/Login';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AppRoutes from './AppRoutes';

function Router() {
    return (
        <Routes>
            <Route element={<Login />} path={AppRoutes.Login} />
            <Route element={<Home />} path={AppRoutes.Home} />
        </Routes>
    );
}

export default Router;
