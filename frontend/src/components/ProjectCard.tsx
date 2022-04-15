import { Project } from '@services/projects';
import React from 'react';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
    <div className="border p-2 bg-white">
        <div>id: {project.id}</div>
        <div>title: {project.title}</div>
        <div>status: {project.status}</div>
    </div>
);

export default ProjectCard;
