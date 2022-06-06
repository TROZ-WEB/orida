import CategoryList from '@components/CategoryList';
import OrganizationTileList from '@components/organizations/OrganizationTileList';
import PollSection from '@components/PollSection';
import ContributorSection from '@components/project/ContributorSection';
import ProjectLocation from '@components/ProjectLocation';
import ThreadSection from '@components/Threads/ThreadSection';
import { PostType } from '@customTypes/post';
import Divider from '@design/Divider';
import Layout from '@design/layouts/Layout';
import ThreeColsLayout, { MenuItem } from '@design/layouts/ThreeCols';
import Loader from '@design/Loader';
import Space from '@design/Space';
import { Paragraph } from '@design/texts';
import { H2, H3 } from '@design/titles';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { castToProjectTab, goToProject, ProjectTab } from '@router/AppRoutes';
import { getOne } from '@store/projects/actions';
import { getAll as getAllRoles } from '@store/roles/actions';
import sortBy from '@utils/sortBy';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';

const ProjectPage = () => {
    const projectId = useParams().projectId ?? '';
    const [query] = useSearchParams();
    const selectedTab = query.get('tab') ? castToProjectTab(query.get('tab')!) : ProjectTab.general;
    const [tab] = useState<ProjectTab>(selectedTab);
    const project = useSelector((state) => state.projects.data.find((p) => p.id === projectId));
    const dispatch = useThunkDispatch();
    const { t } = useTranslation();
    const roles = useSelector((state) => state.roles.data);

    const refresh = () => {
        dispatch(getOne(projectId));
        dispatch(getAllRoles());
    };

    useEffect(() => {
        refresh();
    }, []);

    if (!project) {
        return (
            <Layout className='flex-row'>
                <Loader />
            </Layout>
        );
    }

    // Contributors List (all admins of the project + all admins of every organizations of the project)
    let projectContributions = project.contributors;
    if (roles.find((role) => role.label === 'ADMIN') !== undefined) {
        const OrganizationAdmin = project.organizations
            .map((organization) => {
                return organization.members
                    .filter((member) => member.role.label === 'ADMIN')
                    .map((member) => {
                        return {
                            role: roles.find((r) => r.label === 'ADMIN')!,
                            user: member.user,
                            project,
                        };
                    })
                    .flat();
            })
            .flat();

        projectContributions = projectContributions.concat(OrganizationAdmin);
    }

    const polls = project.posts
        .filter((post) => post.type === PostType.Poll)
        .filter((post) => post.poll !== undefined)
        .map((post) => post.poll!);
    const threads = project.posts
        .filter((post) => post.type === PostType.Thread)
        .filter((post) => post.thread !== undefined)
        .map((post) => post.thread!);

    const left = (
        <>
            <H2 className='pb-3'>{project.title}</H2>
            <CategoryList categories={project.categories} />
            <Space px={28} />
            <ProjectLocation location={project.location} />
            <Divider className='my-6' />
            <OrganizationTileList organizations={project.organizations} />
            <Divider className='my-6' />
            <ContributorSection
                contributors={projectContributions}
                onAddContributor={() => refresh()}
                project={project}
            />
        </>
    );

    const menuItems: MenuItem[] = [
        {
            href: goToProject(project.id, ProjectTab.general),
            iconName: 'map',
            isActive: tab === ProjectTab.general,
        },
        {
            href: goToProject(project.id, ProjectTab.statistics),
            iconName: 'stats',
            isActive: tab === ProjectTab.statistics,
        },
    ];

    return (
        <ThreeColsLayout left={left} menuItems={menuItems}>
            <div className='pt-16 px-16 flex items-start'>
                <div className='flex flex-col mr-16 w-full'>
                    <H3 className='pb-8'>{t('project_details_title')}</H3>
                    <Paragraph>{project.description}</Paragraph>
                </div>
                <div className='grid grid-cols-2 gap-1 w-full max-w-xs'>
                    {project.images.map(({ id, url }) => (
                        <img key={id} alt='project' src={url} />
                    ))}
                </div>
            </div>
            <PollSection polls={polls} project={project} refresh={refresh} />
            <ThreadSection
                project={project}
                refresh={refresh}
                threads={threads.sort(sortBy('createdAt', 'DESC'))}
            />
            <Space px={100} />
        </ThreeColsLayout>
    );
};

export default ProjectPage;
