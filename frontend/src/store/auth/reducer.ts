import { AuthActionTypes, AuthState, SIGN_IN } from './types';

const initialState: AuthState = {
    token: '',
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case SIGN_IN: {
            return {
                ...state,
                token: action.token,
            };
        }
        default:
            return state;
    }
};

export default authReducer;
