/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import { Project } from './Project';

class Category {
    id: string;

    color: string;

    label: string;

    projects: Project[];

    constructor(
        color: string,
        label: string,
        projects: Project[],
    ) {
        this.id = uuidv4();
        this.color = color;
        this.label = label;
        this.projects = projects;
    }
}

export { Category };
