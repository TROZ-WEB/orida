import AuthenticatedRoute from '@components/AuthenticatedRoute';
import NotFound from '@pages/404';
import HomeRedirect from '@pages/Home/HomeRedirect';
import Login from '@pages/Login';
import Search from '@pages/Search';
import { Route, Routes } from 'react-router-dom';

import AppRoutes from './AppRoutes';

const Router = () => (
    <Routes>
        <Route element={<Login />} path={AppRoutes.Login} />
        <Route element={<AuthenticatedRoute />}>
            <Route element={<HomeRedirect />} path={AppRoutes.Home} />
            <Route element={<Search />} path={AppRoutes.Search} />
        </Route>
        <Route element={<NotFound />} path='*' />
    </Routes>
);

export default Router;
