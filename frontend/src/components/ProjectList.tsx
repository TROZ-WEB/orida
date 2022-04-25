import WithTheme from '@customTypes/theme';
import { Project } from '@services/projects';

import ProjectCard from './ProjectCard';

interface ProjectListProps extends WithTheme {
    className?: string;
    projects: Project[];
}

const ProjectList = ({ className, projects, theme }: ProjectListProps) => (
    <ul className={className}>
        {projects.map((project) => (
            <li key={project.id}>
                <ProjectCard project={project} theme={theme} />
            </li>
        ))}
    </ul>
);

export default ProjectList;
