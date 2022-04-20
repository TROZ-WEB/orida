import { Project } from '@services/projects';
import uniq from '@utils/uniq';

import { initialState, ProjectActionTypes, ProjectState } from './types';

/* eslint-disable-next-line default-param-last */
const authReducer = (state = initialState, action: ProjectActionTypes): ProjectState => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                data: uniq<Project>([...state.data, ...action.projects], ['id']),
            };
        case 'SEARCH':
            return {
                ...state,
                search: action.projects,
            };
        default:
            return state;
    }
};

export default authReducer;
