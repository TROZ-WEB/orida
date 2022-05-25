import { RESET_STORE } from '@store/_global/types';

import { AuthActionTypes, AuthState, GET_AUTH, initialState, LOGOUT } from './types';

/* eslint-disable-next-line default-param-last */
const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case GET_AUTH: {
            return {
                ...state,
                data: {
                    ...state.data,
                    id: action.id,
                    email: action.email,
                    isAdmin: action.isAdmin,
                    fullname: action.fullname,
                    organizationMemberships: action.organizationMemberships,
                    projectContributions: action.projectContributions,
                },
            };
        }
        case LOGOUT:
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
