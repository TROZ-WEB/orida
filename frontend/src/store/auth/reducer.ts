import { AuthActionTypes, AuthState, LOGIN, LOGOUT } from './types';

const initialState: AuthState = {
    token: '',
    email: '',
    id: '',
    isAdmin: false,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                id: action.id,
                email: action.email,
                isAdmin: action.isAdmin,
            };
        }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
