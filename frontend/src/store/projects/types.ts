import { Project } from '@services/projects';

export const ADD = 'ADD';
export const SEARCH = 'SEARCH';

export interface Add {
    type: typeof ADD;
    projects: Project[];
}

export interface Search {
    type: typeof SEARCH;
    projects: Project[];
}

export type ProjectActionTypes = Add | Search;

export interface ProjectState {
    data: Project[];
    search: Project[];
}

export const initialState: ProjectState = {
    data: [],
    search: [],
};
