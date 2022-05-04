import PollCreateForm from '@components/PollCreateForm';
import { PostType } from '@customTypes/post';
import { Button } from '@design/buttons';
import Layout from '@design/layouts/Layout';
import ThreeColsLayout, { MenuItem } from '@design/layouts/ThreeCols';
import Loader from '@design/Loader';
import Modal from '@design/modals/DefaultModal';
import Tag from '@design/Tag';
import Paragraph from '@design/texts/Paragraph';
import { H1, H2 } from '@design/titles';
import H3 from '@design/titles/H3';
import useModal from '@hooks/useModal';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { castToProjectTab, goToProject, ProjectTab } from '@router/AppRoutes';
import { getOne } from '@store/projects/actions';
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
    const modalProps = useModal();

    const refresh = () => {
        dispatch(getOne(projectId));
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

    const polls = project.posts.filter((post) => post.type === PostType.Poll);

    const left = (
        <>
            <H2 className='pb-3'>{project.title}</H2>
            {project.categories.map((category) => (
                <Tag key={category.id} className='mb-6' color={category.color}>
                    {category.label}
                </Tag>
            ))}
            <span className='text-sm leading-4 opacity-70'>{project.location}</span>
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
                    {project.images.map((src) => (
                        <img key={src} alt='project' src={src} />
                    ))}
                </div>
            </div>
            <div className='pt-16 px-16'>
                <H1>Sondages ({polls.length})</H1>
                <Button onClick={() => modalProps.open()}>Créer un sondage</Button>
                {polls.map((poll) => (
                    <div key={poll.id}>{poll.id}</div>
                ))}
            </div>
            <Modal {...modalProps}>
                <PollCreateForm
                    onSubmit={() => {
                        modalProps.close();
                        refresh();
                    }}
                    projectId={project.id}
                />
            </Modal>
        </ThreeColsLayout>
    );
};

export default ProjectPage;
