import AdminRoute from '@components/AdminRoute';
import AuthenticatedRoute from '@components/AuthenticatedRoute';
import NotFound from '@pages/404';
import Accounts from '@pages/Accounts';
import DashboardRedirect from '@pages/Dashboard/DashboardRedirect';
import Explore from '@pages/Explore';
import Login from '@pages/Login';
import Organization from '@pages/Organization';
import Project from '@pages/Project';
import Search from '@pages/Search';
import { Route, Routes } from 'react-router-dom';

import AppRoutes from './AppRoutes';

const Router = () => (
    <Routes>
        <Route element={<Explore />} path={AppRoutes.Home} />
        <Route element={<Login />} path={AppRoutes.Login} />
        <Route element={<Search />} path={AppRoutes.Search} />
        <Route element={<Organization />} path={AppRoutes.Organization} />
        <Route element={<Project />} path={AppRoutes.Project} />
        <Route element={<Explore />} path={AppRoutes.Explore} />
        <Route element={<AuthenticatedRoute />}>
            <Route element={<DashboardRedirect />} path={AppRoutes.Dashboard} />
            <Route element={<AdminRoute />}>
                <Route element={<Accounts />} path={AppRoutes.Accounts} />
            </Route>
        </Route>
        <Route element={<NotFound />} path='*' />
    </Routes>
);

export default Router;
