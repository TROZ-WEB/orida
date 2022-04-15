import { Project } from '@services/projects';
import React from 'react';

interface ProjectCardProps {
    project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="border p-2 bg-white">
            <div>id: {project.id}</div>
            <div>title: {project.title}</div>
            <div>status: {project.status}</div>
        </div>
    );
}

export default ProjectCard;
