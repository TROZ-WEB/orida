import Layout from '@components/Layout';
import useSelector from '@hooks/useSelector';
import React from 'react';

function HomeCitizenPage() {
    const auth = useSelector((state) => state.auth);

    return (
        <Layout>
            <h1>{`Bienvenue ${auth.email}`}</h1>
            <p>Citizen</p>
        </Layout>
    );
}

export default HomeCitizenPage;
