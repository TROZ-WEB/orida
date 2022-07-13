/* eslint-disable import/no-cycle */
import Project, { projectSnapshot } from './Project';

interface Image {
    id: string;
    url: string;
    project: Project;
}

export const imageSnapshot = (image: Image): Image => Object.freeze({
    ...image,
    project: projectSnapshot(image.project),
});

export default Image;
