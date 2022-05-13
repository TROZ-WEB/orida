import GoogleMaps from '@design/maps/GoogleMap';
import { Project } from '@services/projects';
import { FC } from 'react';

interface ProjectsMapProps {
    projects: Project[];
}
const ProjectsMap: FC<ProjectsMapProps> = ({ projects }: ProjectsMapProps) => {
    const locatedProjects = projects.filter((project) => !!project.location);
    const markers = locatedProjects.map((project) => ({
        lat: project.location!.latitude,
        lng: project.location!.longitude,
    }));

    return <GoogleMaps markers={markers} />;
};

export default ProjectsMap;
