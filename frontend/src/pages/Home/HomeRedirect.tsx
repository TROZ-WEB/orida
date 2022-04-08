import AppRoutes from '@router/AppRoutes';
import { Navigate } from 'react-router-dom';
import useSelector from '@hooks/useSelector';
import UserType from '@customTypes/userType';
import HomeCitizenPage from './HomeCitizen';
import HomeCommunityPage from './HomeCommunity';

function HomeRedirect() {
    const userType = useSelector(state => state.auth.type);

    if (userType === UserType.None) {
        return <Navigate to={AppRoutes.Login} />;
    }

    return userType === UserType.Citizen
        ? <HomeCitizenPage />
        : <HomeCommunityPage />
}

export default HomeRedirect;
