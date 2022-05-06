import OrganizationCreateForm from '@components/OrganizationCreateForm';
import OrganizationList from '@components/OrganizationList';
import { Theme } from '@customTypes/theme';
import { Button } from '@design/buttons';
import Layout from '@design/layouts/Layout';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import useModal from '@hooks/useModal';
import useSelector from '@hooks/useSelector';
import { useTranslation } from 'react-i18next';

const HomeadminPage = () => {
    const auth = useSelector((state) => state.auth.data);
    const organizations = useSelector((state) => state.organizations.data);
    const organisationModalProps = useModal();
    const { t } = useTranslation();

    return (
        <Layout>
            <h1>{`Bienvenue ${auth.email}`}</h1>
            <p>Admin</p>

            <Modal {...organisationModalProps}>
                <OrganizationCreateForm onCreated={() => organisationModalProps.close()} />
            </Modal>

            <Button onClick={organisationModalProps.open}>
                {t('organization_create_modal_button')}
            </Button>
            <Space px={40} />
            <h1>{t('organization_list_title')}</h1>
            <OrganizationList organizations={organizations} theme={Theme.Dark} />
        </Layout>
    );
};

export default HomeadminPage;
