import { Role } from '@customTypes/role';
import useSelector from '@hooks/useSelector';

import HomeAdmin from './HomeAdmin';
import HomeCitizenPage from './HomeCitizen';

const HomeRedirect = () => {
    const isAdmin = useSelector((state) => state.auth.data.role) === Role.Admin;

    return isAdmin ? <HomeAdmin /> : <HomeCitizenPage />;
};

export default HomeRedirect;
