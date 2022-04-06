import { AuthActionTypes, AuthState, LOGIN } from './types';

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
        default:
            return state;
    }
};

export default authReducer;
