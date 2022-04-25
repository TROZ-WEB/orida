import placeholderProjectSrc from '@assets/placeholder-project.jpg';
import Tag from '@design/Tag';
import { goToProject } from '@router/AppRoutes';
import { Project } from '@services/projects';
import formatBudget from '@utils/formatBudget';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
    <Link className='border-b-2 border-border py-5 w-full flex' to={goToProject(project.id)}>
        <img alt='project' className='w-1/3 rounded mr-4' src={placeholderProjectSrc} />
        <div className='flex flex-col'>
            <Tag className='mb-4'>{project.themes[0]}</Tag>
            <span className='text-white font-semibold text-lg mb-2'>{project.title}</span>
            <span className='text-warning font-semibold'>{formatBudget(project.budget)} €</span>
        </div>
    </Link>
);

export default ProjectCard;
