import { ButtonLink } from '@design/buttons';
import Layout from '@design/layouts/Layout';
import Space from '@design/Space';
import { H1 } from '@design/titles';
import AppRoutes from '@router/AppRoutes';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <Layout className='justify-center items-center'>
            <H1>404</H1>
            <Space px={8} />
            <p>{t('notFound_text')}</p>
            <Space px={8} />
            <ButtonLink className='w-[200px]' to={AppRoutes.Home}>
                {t('notFound_back')}
            </ButtonLink>
        </Layout>
    );
};

export default NotFoundPage;
