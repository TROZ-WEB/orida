import ProjectCreateForm from '@components/ProjectCreateForm';
import ProjectList from '@components/ProjectList';
import { Theme } from '@customTypes/theme';
import { Button } from '@design/buttons';
import Layout from '@design/layouts/Layout';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import useModal from '@hooks/useModal';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { getAll as getAllProjects } from '@store/projects/actions';
import { getAll as getAllProjectStatuses } from '@store/status/actions';
import { useEffect } from 'react';

const HomeCitizenPage = () => {
    const dispatch = useThunkDispatch();
    const auth = useSelector((state) => state.auth.data);
    const projects = useSelector((state) => state.projects.data);
    const projectStatuses = useSelector((state) => state.status.data);
    const modalProps = useModal();

    useEffect(() => {
        dispatch(getAllProjects());
        dispatch(getAllProjectStatuses());
    }, []);

    return (
        <Layout>
            <Modal {...modalProps}>
                <ProjectCreateForm
                    onCreated={() => modalProps.close()}
                    projectStatuses={projectStatuses}
                />
            </Modal>

            <h1>{`Bienvenue ${auth.fullname} (${auth.email})`}</h1>
            <p>Citizen</p>
            <Space px={40} />
            <Button onClick={modalProps.open}>Créer un projet</Button>
            <Space px={40} />
            <h1>Projets</h1>
            <ProjectList projects={projects} theme={Theme.Dark} />
        </Layout>
    );
};

export default HomeCitizenPage;
