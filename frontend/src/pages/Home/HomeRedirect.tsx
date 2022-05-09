import useRole from '@hooks/useRole';

import HomeAdmin from './HomeAdmin';
import HomeCitizenPage from './HomeCitizen';

const HomeRedirect = () => {
    const { isAdmin } = useRole();

    return isAdmin ? <HomeAdmin /> : <HomeCitizenPage />;
};

export default HomeRedirect;
