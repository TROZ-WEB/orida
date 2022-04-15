import { AuthActionTypes, AuthState, LOGIN, LOGOUT } from './types';

const initialState: AuthState = {
    data: {
        email: '',
        id: '',
        isAdmin: false,
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
                    isAdmin: action.isAdmin,
                },
            };
        }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
