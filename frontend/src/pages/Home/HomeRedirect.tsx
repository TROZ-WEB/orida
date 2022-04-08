import UserType from '@customTypes/userType';
import useSelector from '@hooks/useSelector';
import AppRoutes from '@router/AppRoutes';
import React from 'react';
import { Navigate } from 'react-router-dom';

import HomeCitizenPage from './HomeCitizen';
import HomeCommunityPage from './HomeCommunity';

function HomeRedirect() {
    const userType = useSelector((state) => state.auth.type);

    if (userType === UserType.None) {
        return <Navigate to={AppRoutes.Login} />;
    }

    return userType === UserType.Citizen
        ? <HomeCitizenPage />
        : <HomeCommunityPage />;
}

export default HomeRedirect;
