import ProjectCreateForm from '@components/ProjectCreateForm';
import ProjectList from '@components/ProjectList';
import { Button } from '@design/buttons';
import Layout from '@design/layouts/Layout';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import useModal from '@hooks/useModal';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { getAll as getAllProjects } from '@store/projects/actions';
import { useEffect } from 'react';

const HomeCitizenPage = () => {
    const dispatch = useThunkDispatch();
    const auth = useSelector((state) => state.auth.data);
    const projects = useSelector((state) => state.projects.data);
    const modalProps = useModal();

    useEffect(() => {
        dispatch(getAllProjects());
    }, []);

    return (
        <Layout>
            <Modal {...modalProps}>
                <ProjectCreateForm />
            </Modal>

            <h1>{`Bienvenue ${auth.email}`}</h1>
            <p>Citizen</p>
            <Space px={40} />
            <Button onClick={modalProps.open}>Créer un projet</Button>
            <Space px={40} />
            <h1>Projets</h1>
            <ProjectList projects={projects} />
        </Layout>
    );
};

export default HomeCitizenPage;
