import { Project } from '@services/projects';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { FILTER, initialState, ProjectActionTypes, ProjectState, SEARCH, UPSERT } from './types';

/* eslint-disable-next-line default-param-last */
const projectsReducer = (state = initialState, action: ProjectActionTypes): ProjectState => {
    switch (action.type) {
        case UPSERT:
            return {
                ...state,
                data: [...uniq<Project>([...action.projects, ...state.data], ['id'])],
            };
        case SEARCH:
            return {
                ...state,
                search: action.projects,
            };
        case FILTER:
            return {
                ...state,
                filter: action.projects,
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default projectsReducer;
