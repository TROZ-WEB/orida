import useSelector from '@hooks/useSelector';
import React from 'react';

import HomeCitizenPage from './HomeCitizen';
import HomeCommunityPage from './HomeCommunity';

function HomeRedirect() {
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    return isAdmin
        ? <HomeCommunityPage />
        : <HomeCitizenPage />
}

export default HomeRedirect;
