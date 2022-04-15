import { Project } from '@services/projects';
import React from 'react';

import ProjectCard from './ProjectCard';

interface ProjectListProps {
    projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
    return (
        <ul>
            {projects.map((project) => <li className="pb-2"><ProjectCard project={project} /></li>)}
        </ul>
    );
}

export default ProjectList;
