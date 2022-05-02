import { Role } from '@customTypes/role';
import { RESET_STORE } from '@store/_global/types';

import { AuthActionTypes, AuthState, LOGIN, LOGOUT } from './types';

const initialState: AuthState = {
    data: {
        email: '',
        id: '',
        role: Role.None,
    },
};

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
                    role: action.role,
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
