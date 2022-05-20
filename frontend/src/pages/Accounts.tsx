import AddMemberToOrganizationForm from '@components/AddMemberToOrganizationForm';
import { Button } from '@design/buttons';
import Layout from '@design/layouts/Layout';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import useModal from '@hooks/useModal';

const AccountsPage = () => {
    const addMemberToOrgaModalProps = useModal();

    return (
        <Layout>
            <Space px={60} />
            <Button onClick={() => addMemberToOrgaModalProps.open()}>
                Ajouter un utilisateur à une organisation
            </Button>
            <Modal {...addMemberToOrgaModalProps}>
                <AddMemberToOrganizationForm />
            </Modal>
        </Layout>
    );
};

export default AccountsPage;
