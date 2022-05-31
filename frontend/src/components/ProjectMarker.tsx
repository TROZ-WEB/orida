import placeholderProjectSrc from '@assets/placeholder-project.jpg';
import { H3 } from '@design/titles';
import { goToProject } from '@router/AppRoutes';
import { Project } from '@services/projects';

interface ProjectMarkerProps {
    project: Project;
}

const ProjectMarker = ({ project }: ProjectMarkerProps) => (
    // Note: a <Link> element cannot be used as the marker is not in a <Route> context
    <a href={goToProject(project.id)}>
        <div>
            <img alt='' src={project.images?.[0]?.url || placeholderProjectSrc} />
            <H3>{project.title}</H3>
        </div>
    </a>
);

export default ProjectMarker;
