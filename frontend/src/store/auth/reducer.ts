import { AuthActionTypes, AuthState, LOGIN, LOGOUT } from './types';

const initialState: AuthState = {
    token: '',
    email: '',
    id: '',
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                id: action.id,
                email: action.email,
            };
        }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
