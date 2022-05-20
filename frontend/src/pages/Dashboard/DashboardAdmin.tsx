import OrganizationForm from '@components/OrganizationForm';
import OrganizationList from '@components/OrganizationList';
import ProjectCreateForm from '@components/ProjectCreateForm';
import ProjectList from '@components/ProjectList';
import FormActions from '@customTypes/FormActions';
import { Theme } from '@customTypes/theme';
import { Button } from '@design/buttons';
import Divider from '@design/Divider';
import Layout from '@design/layouts/Layout';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import { H1 } from '@design/titles';
import useModal from '@hooks/useModal';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { getAll as getAllOrganizations } from '@store/organizations/actions';
import { getAll as getAllProjects } from '@store/projects/actions';
import { getAll as getAllProjectStatuses } from '@store/status/actions';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DashboardAdminPage = () => {
    const dispatch = useThunkDispatch();
    const auth = useSelector((state) => state.auth.data);
    const projects = useSelector((state) => state.projects.data);
    const organizations = useSelector((state) => state.organizations.data);
    const projectModalProps = useModal();
    const organisationModalProps = useModal();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getAllOrganizations());
        dispatch(getAllProjects());
        dispatch(getAllProjectStatuses());
    }, []);

    return (
        <Layout>
            <h1>{`Bienvenue ${auth.email}`}</h1>
            <p>Admin</p>
            <Divider className='my-4' />
            <div className='flex'>
                <div className='w-full'>
                    <H1>Organizations</H1>
                    <Button onClick={organisationModalProps.open}>
                        {t('organization_create_modal_button')}
                    </Button>
                    <Space px={40} />
                    <OrganizationList organizations={organizations} theme={Theme.Dark} />
                    <Modal {...organisationModalProps}>
                        <OrganizationForm
                            action={FormActions.Create}
                            onCreated={() => organisationModalProps.close()}
                        />
                    </Modal>
                </div>
                <div className='w-full'>
                    <H1>Projets</H1>
                    <Button onClick={projectModalProps.open}>
                        {t('project_create_modal_button')}
                    </Button>
                    <Space px={40} />
                    <ProjectList projects={projects} theme={Theme.Dark} />
                    <Modal {...projectModalProps}>
                        <ProjectCreateForm onCreated={() => projectModalProps.close()} />
                    </Modal>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardAdminPage;
