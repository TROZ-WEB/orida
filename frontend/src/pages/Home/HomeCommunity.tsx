import Layout from '@components/Layout';
import useSelector from '@hooks/useSelector';
import React from 'react';

function HomeCommunityPage() {
    const auth = useSelector((state) => state.auth);

    return (
        <Layout>
            <h1>{`Bienvenue ${auth.email}`}</h1>
            <p>Community</p>
        </Layout>
    );
}

export default HomeCommunityPage;
