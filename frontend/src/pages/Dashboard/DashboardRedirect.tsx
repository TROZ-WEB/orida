import useRole from '@hooks/useRole';

import DashboardAdmin from './DashboardAdmin';
import DashboardCitizenPage from './DashboardCitizen';

const DashboardRedirect = () => {
    const { isAdmin } = useRole();

    return isAdmin ? <DashboardAdmin /> : <DashboardCitizenPage />;
};

export default DashboardRedirect;
