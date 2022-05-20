import { RESET_STORE } from '@store/_global/types';

import { AuthActionTypes, AuthState, initialState, LOGIN, LOGOUT } from './types';

/* eslint-disable-next-line default-param-last */
const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                data: {
                    ...state.data,
                    id: action.id,
                    email: action.email,
                    isAdmin: action.isAdmin,
                    fullname: action.fullname,
                    organizationMemberships: action.organizationMemberships,
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
