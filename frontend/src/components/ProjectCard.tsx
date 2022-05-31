import placeholderProjectSrc from '@assets/placeholder-project.jpg';
import WithTheme, { Theme } from '@customTypes/theme';
import { goToProject } from '@router/AppRoutes';
import { Project } from '@services/projects';
import formatBudget from '@utils/formatBudget';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import CategoryList from './CategoryList';

interface ProjectCardProps extends WithTheme {
    project: Project;
}

const classes = {
    budget: 'text-warning font-semibold',
    content: 'flex flex-col',
    image: 'w-1/3 rounded mr-4',
    tag: 'mb-4',
    title: 'text-white font-semibold text-lg mb-2',
    titleDark: 'text-primary',
    wrapper: 'border-b-2 border-border flex py-5 w-full',
};

const ProjectCard = ({ project, theme = Theme.Light }: ProjectCardProps) => {
    return (
        <Link className={classes.wrapper} to={goToProject(project.id)}>
            <img
                alt='project'
                className={classes.image}
                src={project.images?.[0]?.url || placeholderProjectSrc}
            />
            <div className={classes.content}>
                <CategoryList categories={project.categories} />
                <span
                    className={classnames(classes.title, {
                        [classes.titleDark]: theme === Theme.Dark,
                    })}
                >
                    {project.title}
                </span>
                <span className={classes.budget}>{formatBudget(project.budget)} €</span>
            </div>
        </Link>
    );
};

export default ProjectCard;
