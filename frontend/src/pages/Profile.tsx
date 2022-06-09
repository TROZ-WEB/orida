import placeholderProfileSrc from '@assets/placeholder-profile.png';
import OrganizationForm from '@components/OrganizationForm';
import OrganizationList from '@components/OrganizationList';
import ProjectForm from '@components/ProjectForm';
import ProjectList from '@components/ProjectList';
import FormActions from '@customTypes/FormActions';
import { IconButton } from '@design/buttons';
import Divider from '@design/Divider';
import Icon from '@design/Icon';
import Layout from '@design/layouts/Layout';
import Loader from '@design/Loader';
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
import { getOne as getOneUser } from '@store/users/actions';
import colors from '@styles/colors';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const userId = useParams().userId ?? '';
    const { isAdmin, isAdminOfAtLeastOneOrganization } = useRole();
    const dispatch = useThunkDispatch();
    const user = useSelector((state) =>
        state.users.data.find((userData) => userData.id === userId)
    );
    const projects = useSelector((state) => state.projects.data);
    const auth = useSelector((state) => state.auth.data);
    const organizations = useSelector((state) => state.organizations.data);
    const projectModalProps = useModal();
    const organisationModalProps = useModal();
    const { t } = useTranslation();
    const isAuth = userId === auth.id;

    useEffect(() => {
        dispatch(getAllOrganizations());
        dispatch(getAllProjects());
        dispatch(getAllProjectStatuses());
        dispatch(getOneUser(userId));
    }, []);

    if (!user) {
        return (
            <Layout className='flex-row'>
                <Loader />
            </Layout>
        );
    }

    // Get organization list
    let organizationList: Organization[] = [];
    if (isAdmin) {
        organizationList = organizations;
    } else {
        organizationList = user.organizationMemberships.map(
            (membership) => membership.organization
        );
    }

    // Get projects list
    let projectList: Project[] = [];
    if (isAdmin) {
        projectList = projects;
    } else {
        projectList = user.projectContributions.map((contribution) => contribution.project);
        const projectsListIds = projectList.map((project) => project.id);

        const organizationsProjects = user.organizationMemberships
            .filter((membership) => membership.role.label === 'ADMIN')
            .map((membership) => membership.organization.projects)
            .flat()
            .filter((project) => !projectsListIds.includes(project.id));

        projectList = projectList.concat(organizationsProjects);
    }

    return (
        <Layout cover>
            <div className='w-full flex justify-center items-center flex-col mb-3'>
                <img
                    alt='profile'
                    className='rounded-full border-2 border-white w-24 h-24'
                    src={placeholderProfileSrc}
                />
                <H1>{`${user.fullname}`}</H1>
                {isAdminOfAtLeastOneOrganization && (
                    <div className='flex items-center mt-3'>
                        <Icon color={colors.grey} name='email' />
                        <a className='text-sm text-grey ml-2' href={`mailto:${user.email}`}>
                            {user.email}
                        </a>
                    </div>
                )}
                <Paragraph className='mt-3'>{t('profile_placeholder')}</Paragraph>
            </div>
            <Divider className='my-4' />
            <div className='flex w-full gap-10'>
                <div className='w-1/4'>
                    <div className='flex'>
                        <H2>{t('organization_list_title')}</H2>
                        {isAdmin && (
                            <IconButton className='ml-2' onClick={organisationModalProps.open}>
                                <Icon color={colors.secondary} name='plus' />
                            </IconButton>
                        )}
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
                <div className='w-3/4'>
                    <div className='flex'>
                        <H2>{t('project_list_title')}</H2>
                        {isAuth && isAdminOfAtLeastOneOrganization && (
                            <IconButton className='ml-2' onClick={projectModalProps.open}>
                                <Icon color={colors.secondary} name='plus' />
                            </IconButton>
                        )}
                    </div>
                    <Space px={40} />
                    <ProjectList projects={projectList} />
                    <Modal {...projectModalProps}>
                        <ProjectForm onCreated={() => projectModalProps.close()} />
                    </Modal>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
