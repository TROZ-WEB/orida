import useSelector from '@hooks/useSelector';

import HomeAdmin from './HomeAdmin';
import HomeCitizenPage from './HomeCitizen';

const HomeRedirect = () => {
    const isAdmin = useSelector((state) => state.auth.data.isAdmin);

    return isAdmin ? <HomeAdmin /> : <HomeCitizenPage />;
};

export default HomeRedirect;
