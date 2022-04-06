import Layout from '@components/Layout';
import useSelector from '@hooks/useSelector';
import React from 'react';

function HomePage() {
    const auth = useSelector((state) => state.auth);

    return (
        <Layout>
            <h1>{`Bienvenue ${auth.email}`}</h1>
        </Layout>
    );
}

export default HomePage;
