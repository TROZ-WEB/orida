import { Project } from '@services/projects';

export const ADD = 'ADD';

export interface Add {
    type: typeof ADD;
    projects: Project[];
}

export type ProjectActionTypes = Add;

export interface ProjectState {
    data: Project[];
}
