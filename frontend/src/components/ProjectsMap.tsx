import GoogleMaps from '@design/maps/GoogleMap';
import { Project } from '@services/projects';
import { FC } from 'react';

const markers = [
    { lat: 48.8566809713864, lng: 2.36436548511735 },
    { lat: 48.88028093450656, lng: 2.352664977411716 },
    { lat: 48.868313114974995, lng: 2.387340575556247 },
    { lat: 48.845498588638534, lng: 2.3080330194039034 },
    { lat: 48.82561210852643, lng: 2.350261718134372 },
    { lat: 48.82629018668857, lng: 2.3578148187203096 },
]; //! MOCK

interface ProjectsMapProps {
    projects: Project[];
}
const ProjectsMap: FC<ProjectsMapProps> = () => {
    return <GoogleMaps markers={markers} />;
};

export default ProjectsMap;
