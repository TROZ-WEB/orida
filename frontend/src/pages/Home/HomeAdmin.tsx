import Layout from '@components/Layout';
import useSelector from '@hooks/useSelector';
import React from 'react';

function HomeadminPage() {
    const auth = useSelector((state) => state.auth.data);

    return (
        <Layout>
            <h1>{`Bienvenue ${auth.email}`}</h1>
            <p>Admin</p>
        </Layout>
    );
}

export default HomeadminPage;
