import { H3 } from '@design/titles';
import { Project } from '@services/projects';

interface ProjectMarkerProps {
    project: Project;
}

const ProjectMarker = ({ project }: ProjectMarkerProps) => (
    <div>
        <img alt='' src={project.images[0]} />
        <H3>{project.title}</H3>
    </div>
);

export default ProjectMarker;
