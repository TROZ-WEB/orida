/* eslint-disable import/no-cycle */
import Project from './Project';

interface Image {
    id: string;
    url: string;
    project: Project;
}

export default Image;
