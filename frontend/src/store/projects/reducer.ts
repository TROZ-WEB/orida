import { Project } from '@services/projects';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { ADD, FILTER, initialState, ProjectActionTypes, ProjectState, SEARCH } from './types';

/* eslint-disable-next-line default-param-last */
const projectsReducer = (state = initialState, action: ProjectActionTypes): ProjectState => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                data: uniq<Project>([...state.data, ...action.projects], ['id']),
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
