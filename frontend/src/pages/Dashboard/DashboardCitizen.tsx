import ProjectCreateForm from '@components/ProjectCreateForm';
import ProjectList from '@components/ProjectList';
import { Theme } from '@customTypes/theme';
import { Button } from '@design/buttons';
import Layout from '@design/layouts/Layout';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import useModal from '@hooks/useModal';
import useRole from '@hooks/useRole';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { getAll as getAllProjects } from '@store/projects/actions';
import { getAll as getAllProjectStatuses } from '@store/status/actions';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DashboardCitizenPage = () => {
    const dispatch = useThunkDispatch();
    const auth = useSelector((state) => state.auth.data);
    const projects = useSelector((state) => state.projects.data);
    const projectModalProps = useModal();
    const { t } = useTranslation();
    const { isAdmin } = useRole();

    useEffect(() => {
        dispatch(getAllProjects());
        dispatch(getAllProjectStatuses());
    }, []);

    return (
        <Layout>
            <Modal {...projectModalProps}>
                <ProjectCreateForm onCreated={() => projectModalProps.close()} />
            </Modal>

            <h1>{`Bienvenue ${auth.fullname} (${auth.email})`}</h1>
            <p>Citizen</p>
            <Space px={40} />

            {/* if the citizen does not have an admin role he cannot see the button */}
            {isAdmin && (
                <Button onClick={projectModalProps.open}>{t('project_create_modal_button')}</Button>
            )}

            <Space px={40} />
            <h1>{t('project_list_title')}</h1>
            <ProjectList projects={projects} theme={Theme.Dark} />
        </Layout>
    );
};

export default DashboardCitizenPage;
