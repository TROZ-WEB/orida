import Layout from '@design/layouts/Layout';
import useSelector from '@hooks/useSelector';

const HomeadminPage = () => {
    const auth = useSelector((state) => state.auth.data);

    return (
        <Layout>
            <h1>{`Bienvenue ${auth.email}`}</h1>
            <p>Admin</p>
        </Layout>
    );
};

export default HomeadminPage;
