import placeholderProjectSrc from '@assets/placeholder-project.jpg';
import Tag from '@design/Tag';
import { Project } from '@services/projects';
import formatBudget from '@utils/formatBudget';
import React from 'react';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
    <div className='border-b-2 border-border py-5 w-full flex'>
        <img alt='project' className='w-1/3 rounded mr-4' src={placeholderProjectSrc} />
        <div className='flex flex-col'>
            <Tag className='mb-4'>{project.theme}</Tag>
            <span className='text-white font-semibold text-lg mb-2'>{project.title}</span>
            <span className='text-warning font-semibold'>{formatBudget(project.budget)} €</span>
        </div>
    </div>
);

export default ProjectCard;
