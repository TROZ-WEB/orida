import { Paragraph } from '@design/texts';
import { Project } from '@services/projects';
import classnames from '@utils/classnames';
import { useTranslation } from 'react-i18next';

import ProjectCard from './ProjectCard';

interface ProjectListProps {
    className?: string;
    projects: Project[];
}

const classes = {
    list: 'flex flex-wrap gap-x-8 gap-y-6 mb-4',
};

const ProjectList = ({ className, projects }: ProjectListProps) => {
    const { t } = useTranslation();

    return projects.length > 0 ? (
        <ul className={classnames(className, classes.list)}>
            {projects.map((project) => (
                <li key={project.id}>
                    <ProjectCard project={project} />
                </li>
            ))}
        </ul>
    ) : (
        <Paragraph className='text-grey'>{t('no_projects')}</Paragraph>
    );
};

export default ProjectList;
