import Layout from '@components/Layout';
import Icon from '@design/Icon';
import Loader from '@design/Loader';
import Tag from '@design/Tag';
import Paragraph from '@design/texts/Paragraph';
import H2 from '@design/titles/H2';
import H3 from '@design/titles/H3';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { castToProjectTab, goToProject, ProjectTab } from '@router/AppRoutes';
import { getOne } from '@store/projects/actions';
import classnames from '@utils/classnames';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useSearchParams } from 'react-router-dom';

const BUTTON_CLASSES = `
bg-secondary
w-[50px]
h-[50px]
overflow-hidden
`;

const BUTTON_ACTIVE_CLASSES = `
bg-secondary-dark
`;

const ProjectPage = () => {
    const projectId = useParams().projectId ?? '';
    const [query] = useSearchParams();
    const selectedTab = query.get('tab') ? castToProjectTab(query.get('tab')!) : ProjectTab.general;
    const [tab] = useState<ProjectTab>(selectedTab);
    const project = useSelector((state) => state.projects.data.find((p) => p.id === projectId));
    const dispatch = useThunkDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        if (!project) {
            dispatch(getOne(projectId));
        }
    }, []);

    if (!project) {
        return (
            <Layout className='flex-row'>
                <Loader />
            </Layout>
        );
    }

    return (
        <Layout className='flex-row bg-white' fullWith>
            <aside className='w-full max-w-[30%] flex flex-col py-7 px-8'>
                <H2 className='pb-3'>{project.title}</H2>
                <Tag className='mb-6'>{project.themes[0]}</Tag>
                <span className='text-sm leading-4 opacity-70'>{project.location}</span>
            </aside>
            <div className='border-border border-x-2 h-full flex flex-col'>
                <Link
                    className={classnames(BUTTON_CLASSES, {
                        [BUTTON_ACTIVE_CLASSES]: tab === ProjectTab.general,
                    })}
                    to={goToProject(project.id, ProjectTab.general)}
                >
                    <Icon name='map' />
                </Link>
                <Link
                    className={classnames(BUTTON_CLASSES, {
                        [BUTTON_ACTIVE_CLASSES]: tab === ProjectTab.statistics,
                    })}
                    to={goToProject(project.id, ProjectTab.statistics)}
                >
                    <Icon name='stats' />
                </Link>
            </div>
            <main className='w-full'>
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
            </main>
        </Layout>
    );
};

export default ProjectPage;
