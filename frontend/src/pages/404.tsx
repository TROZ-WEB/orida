import Layout from '@components/Layout';
import { ButtonLink } from '@design/buttons';
import Space from '@design/Space';
import PageTitle from '@design/titles/PageTitle';
import AppRoutes from '@router/AppRoutes';
import React from 'react';
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <Layout className="justify-center items-center">
                <PageTitle>404</PageTitle>
            <Space px={8} />
            <p>
                {t('notFound_text')}
            </p>
            <Space px={8} />
            <ButtonLink to={AppRoutes.Home}>{t('notFound_back')}</ButtonLink>
        </Layout>
    );
}

export default NotFoundPage;
