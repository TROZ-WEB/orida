import AddMemberToOrganizationForm from '@components/AddMemberToOrganizationForm';
import { Button } from '@design/buttons';
import Layout from '@design/layouts/Layout';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import useModal from '@hooks/useModal';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { getAllUsers } from '@store/admin/actions';
import { getAll as getAllOrganizations } from '@store/organizations/actions';
import { useEffect } from 'react';

const AccountsPage = () => {
    const dispatch = useThunkDispatch();
    const addMemberToOrgaModalProps = useModal();
    const users = useSelector((state) => state.admin.users);
    const organizations = useSelector((state) => state.organizations.data);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllOrganizations());
    }, []);

    return (
        <Layout>
            <Space px={60} />
            <Button onClick={() => addMemberToOrgaModalProps.open()}>
                Ajouter un utilisateur à une organisation
            </Button>
            <Modal {...addMemberToOrgaModalProps}>
                <AddMemberToOrganizationForm organizations={organizations} users={users} />
            </Modal>
        </Layout>
    );
};

export default AccountsPage;
