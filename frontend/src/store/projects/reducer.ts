import { Project } from '@services/projects';
import uniq from '@utils/uniq';

import { ProjectActionTypes, ProjectState } from './types';

const initialState: ProjectState = {
    data: [],
};

/* eslint-disable-next-line default-param-last */
const authReducer = (state = initialState, action: ProjectActionTypes): ProjectState => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                data: uniq<Project>([...state.data, ...action.projects], ['id']),
            };
        default:
            return state;
    }
};

export default authReducer;
