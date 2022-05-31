/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { Project } from './Project';

class Image {
    id: string;

    url: string;

    project: Project;

    constructor(
        url: string,
        project: Project,
    ) {
        this.url = url;
        this.project = project;
        this.id = uuidv4();
    }
}

export { Image };
