import { Project } from '@services/projects';

import ProjectCard from './ProjectCard';

interface ProjectListProps {
    className?: string;
    projects: Project[];
}

const ProjectList = ({ className, projects }: ProjectListProps) => (
    <ul className={className}>
        {projects.map((project) => (
            <li key={project.id}>
                <ProjectCard project={project} />
            </li>
        ))}
    </ul>
);

export default ProjectList;
