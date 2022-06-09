import placeholderProjectSrc from '@assets/placeholder-project.jpg';
import ProjectLocation from '@components/ProjectLocation';
import { H3 } from '@design/titles';
import { goToProject } from '@router/AppRoutes';
import { Project } from '@services/projects';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import CategoryList from './CategoryList';

interface ProjectCardProps {
    project: Project;
}

const classes = {
    title: 'truncate',
    description: 'text-xs text-primary-dark font-bold min-h-[34px] text-ellipsis line-clamp-2 mb-1',
    wrapper: 'shadow relative rounded-lg overflow-hidden w-80',
    categories: 'absolute top-4 left-4',
    image: 'w-full h-32 bg-cover bg-center',
    content: 'mx-4 py-4 border-border border-b box-border',
    link: `
        w-full 
        p-3 
        text-secondary 
        font-bold 
        text-center 
        relative
    `,
};

const ProjectCard = ({ project }: ProjectCardProps) => {
    const { t } = useTranslation();

    // converts HTML to well escaped Text
    function getText(html: string) {
        const divContainer = document.createElement('div');
        divContainer.innerHTML = html.replace(/<[^>]+>/g, ' ');

        return divContainer.textContent || divContainer.innerText || '';
    }

    const description = getText(project.description);

    return (
        <div className={classnames(classes.wrapper)}>
            <Link to={goToProject(project.id)}>
                <CategoryList categories={project.categories} className={classes.categories} />
                <div
                    className={classes.image}
                    style={{
                        backgroundImage: `url(${project.images?.[0]?.url || placeholderProjectSrc}`,
                    }}
                />
                <div className={classes.content}>
                    <H3 className={classnames(classes.title)}>{project.title}</H3>
                    <div className={classes.description}>{description}</div>
                    <ProjectLocation location={project.location} />
                </div>
                <div className={classes.link}>{t('project_link')}</div>
            </Link>
        </div>
    );
};

export default ProjectCard;
