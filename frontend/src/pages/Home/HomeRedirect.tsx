import useSelector from '@hooks/useSelector';
import React from 'react';

import HomeCitizenPage from './HomeCitizen';
import HomeAdmin from './HomeAdmin';

function HomeRedirect() {
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    return isAdmin
        ? <HomeAdmin />
        : <HomeCitizenPage />
}

export default HomeRedirect;
