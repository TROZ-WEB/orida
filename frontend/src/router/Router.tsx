import AdminRoute from '@components/AdminRoute';
import AuthenticatedRoute from '@components/AuthenticatedRoute';
import NotFound from '@pages/404';
import Accounts from '@pages/Accounts';
import Explore from '@pages/Explore';
import HomeRedirect from '@pages/Home/HomeRedirect';
import Login from '@pages/Login';
import Project from '@pages/Project';
import Search from '@pages/Search';
import { Route, Routes } from 'react-router-dom';

import AppRoutes from './AppRoutes';

const Router = () => (
    <Routes>
        <Route element={<Login />} path={AppRoutes.Login} />
        <Route element={<AuthenticatedRoute />}>
            <Route element={<HomeRedirect />} path={AppRoutes.Home} />
            <Route element={<Search />} path={AppRoutes.Search} />
            <Route element={<Project />} path={AppRoutes.Project} />
            <Route element={<Explore />} path={AppRoutes.Explore} />

            <Route element={<AdminRoute />}>
                <Route element={<Accounts />} path={AppRoutes.Accounts} />
            </Route>
        </Route>
        <Route element={<NotFound />} path='*' />
    </Routes>
);

export default Router;
