import placeholderProfileSrc from '@assets/placeholder-profile.png';
import OrganizationForm from '@components/OrganizationForm';
import OrganizationList from '@components/OrganizationList';
import ProjectCreateForm from '@components/ProjectCreateForm';
import ProjectList from '@components/ProjectList';
import FormActions from '@customTypes/FormActions';
import { IconButton } from '@design/buttons';
import Divider from '@design/Divider';
import Icon from '@design/Icon';
import Layout from '@design/layouts/Layout';
import Modal from '@design/modals/DefaultModal';
import Space from '@design/Space';
import { Paragraph } from '@design/texts';
import { H1, H2 } from '@design/titles';
import useModal from '@hooks/useModal';
import useRole from '@hooks/useRole';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { Organization } from '@services/organizations';
import { Project } from '@services/projects';
import { getAll as getAllOrganizations } from '@store/organizations/actions';
import { getAll as getAllProjects } from '@store/projects/actions';
import { getAll as getAllProjectStatuses } from '@store/status/actions';
import colors from '@styles/colors';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DashboardAdminPage = () => {
    const { isAdmin } = useRole();
    const dispatch = useThunkDispatch();
    const auth = useSelector((state) => state.auth.data);
    const projects = useSelector((state) => state.projects.data);
    const organizations = useSelector((state) => state.organizations.data);
    const projectModalProps = useModal();
    const organisationModalProps = useModal();
    const { t } = useTranslation();

    // Get organization list
    let organizationList: Organization[] = [];
    if (isAdmin) {
        organizationList = organizations;
    } else {
        organizationList = auth.organizationMemberships
            .filter((membership) => membership.role.label === 'ADMIN')
            .map((membership) => membership.organization);
    }

    // Get projects list
    let projectList: Project[] = [];
    if (isAdmin) {
        projectList = projects;
    } else {
        projectList = auth.projectContributions.map((contribution) => contribution.project);
        const projectsListIds = projectList.map((project) => project.id);

        const organizationsProjects = auth.organizationMemberships
            .filter((membership) => membership.role.label === 'ADMIN')
            .map((membership) => membership.organization.projects)
            .flat()
            .filter((project) => !projectsListIds.includes(project.id));

        projectList = projectList.concat(organizationsProjects);
    }

    useEffect(() => {
        dispatch(getAllOrganizations());
        dispatch(getAllProjects());
        dispatch(getAllProjectStatuses());
    }, []);

    return (
        <Layout cover>
            <div className='w-full flex justify-center items-center flex-col mb-3'>
                <img
                    alt='profile'
                    className='rounded-full border-2 border-white w-24 h-24'
                    src={placeholderProfileSrc}
                />
                <H1>{`${auth.fullname}`}</H1>
                <Paragraph className='text-grey my-3'>{isAdmin ? 'Admin' : 'Citizen'}</Paragraph>
                <Paragraph>{t('profile_placeholder')}</Paragraph>
            </div>
            <Divider className='my-4' />
            <div className='flex gap-10'>
                <div className=''>
                    <div className='flex'>
                        <H2>{t('organization_list_title')}</H2>
                        <IconButton className='ml-2' onClick={organisationModalProps.open}>
                            <Icon color={colors.secondary} name='plus' />
                        </IconButton>
                    </div>
                    <Space px={40} />
                    <OrganizationList organizations={organizationList} />
                    <Modal {...organisationModalProps}>
                        <OrganizationForm
                            action={FormActions.Create}
                            onCreated={() => organisationModalProps.close()}
                        />
                    </Modal>
                </div>
                <div>
                    <div className='flex'>
                        <H2>{t('project_list_title')}</H2>
                        <IconButton className='ml-2' onClick={projectModalProps.open}>
                            <Icon color={colors.secondary} name='plus' />
                        </IconButton>
                    </div>
                    <Space px={40} />
                    <ProjectList projects={projectList} />
                    <Modal {...projectModalProps}>
                        <ProjectCreateForm onCreated={() => projectModalProps.close()} />
                    </Modal>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardAdminPage;
