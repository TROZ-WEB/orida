import GoogleMaps from '@design/maps/GoogleMap';
import { Project } from '@services/projects';
import { FC } from 'react';

import ProjectMarker from './ProjectMarker';

interface ProjectsMapProps {
    projects: Project[];
}
const ProjectsMap: FC<ProjectsMapProps> = ({ projects }: ProjectsMapProps) => {
    const locatedProjects = projects.filter((project) => !!project.location);
    const markers = locatedProjects.map((project) => ({
        data: project,
        position: {
            lat: project.location!.latitude,
            lng: project.location!.longitude,
        },
    }));

    return (
        <GoogleMaps<Project>
            markers={markers}
            renderMarkerCard={(project) => <ProjectMarker project={project} />}
        />
    );
};

export default ProjectsMap;
