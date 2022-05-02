/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import { Project } from './Project';

class Category {
    createdAt: Date;

    modifiedAt: Date;

    id: string;

    picture: string;

    label: string;

    projects: Project[];

    constructor(
        picture: string,
        label: string,
        projects: Project[],
    ) {
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.id = uuidv4();
        this.picture = picture;
        this.label = label;
        this.projects = projects;
    }
}

export { Category };
