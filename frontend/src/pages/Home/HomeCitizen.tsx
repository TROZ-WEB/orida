import Layout from '@components/Layout';
import ProjectCreateForm from '@components/ProjectCreateForm';
import ProjectList from '@components/ProjectList';
import Space from '@design/Space';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { getAll as getAllProjects } from '@store/projects/actions';
import React, { useEffect } from 'react';

function HomeCitizenPage() {
    const dispatch = useThunkDispatch();
    const auth = useSelector((state) => state.auth.data);
    const projects = useSelector((state) => state.projects.data);

    useEffect(() => {
        dispatch(getAllProjects());
    }, []);

    return (
        <Layout>
            <h1>{`Bienvenue ${auth.email}`}</h1>
            <p>Citizen</p>
            <Space px={40} />
            <h1>Créer un projet</h1>
            <ProjectCreateForm />
            <Space px={40} />
            <h1>Projets</h1>
            <ProjectList projects={projects} />
        </Layout>
    );
}

export default HomeCitizenPage;
