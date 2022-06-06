import { Project } from '@services/projects';
import classnames from '@utils/classnames';

import ProjectCard from './ProjectCard';

interface ProjectListProps {
    className?: string;
    projects: Project[];
}

const classes = {
    list: 'flex flex-wrap gap-x-8 gap-y-6 mb-4',
};

const ProjectList = ({ className, projects }: ProjectListProps) => (
    <ul className={classnames(className, classes.list)}>
        {projects.map((project) => (
            <li key={project.id}>
                <ProjectCard project={project} />
            </li>
        ))}
    </ul>
);

export default ProjectList;
