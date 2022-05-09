import { Project } from '@services/projects';
import { GlobalActionTypes } from '@store/_global/types';

export const UPSERT = 'PROJECTS_UPSERT';
export const FILTER = 'PROJECTS_FILTER';
export const SEARCH = 'PROJECTS_SEARCH';

export interface Upsert {
    type: typeof UPSERT;
    projects: Project[];
}

export interface Search {
    type: typeof SEARCH;
    projects: Project[];
}

export interface Filter {
    type: typeof FILTER;
    projects: Project[];
}

export type ProjectActionTypes = GlobalActionTypes | Upsert | Search | Filter;

export interface ProjectState {
    data: Project[];
    search: Project[];
    filter: Project[];
}

export const initialState: ProjectState = {
    data: [],
    search: [],
    filter: [],
};
