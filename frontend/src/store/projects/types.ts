import { Project } from '@services/projects';
import { GlobalActionTypes } from '@store/_global/types';

export const ADD = 'PROJECTS_ADD';
export const SEARCH = 'PROJECTS_SEARCH';

export interface Add {
    type: typeof ADD;
    projects: Project[];
}

export interface Search {
    type: typeof SEARCH;
    projects: Project[];
}

export type ProjectActionTypes = GlobalActionTypes | Add | Search;

export interface ProjectState {
    data: Project[];
    search: Project[];
}

export const initialState: ProjectState = {
    data: [],
    search: [],
};
