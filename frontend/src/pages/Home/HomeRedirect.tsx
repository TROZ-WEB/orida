import useSelector from '@hooks/useSelector';
import React from 'react';

import HomeAdmin from './HomeAdmin';
import HomeCitizenPage from './HomeCitizen';

function HomeRedirect() {
    const isAdmin = useSelector((state) => state.auth.data.isAdmin);

    return isAdmin
        ? <HomeAdmin />
        : <HomeCitizenPage />;
}

export default HomeRedirect;
