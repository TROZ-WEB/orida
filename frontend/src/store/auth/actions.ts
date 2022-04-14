import { ReduxDispatch } from '@hooks/useThunkDispatch';
import AuthService, { LoginProps, RegisterProps } from '@services/auth';

import {
    AuthActionTypes,
    LOGIN,
    Login,
    LOGOUT,
} from './types';

export const loginAction = (payload: Omit<Login, 'type'>): AuthActionTypes => ({
    type: LOGIN,
    ...payload,
});

export const logoutAction = (): AuthActionTypes => ({
    type: LOGOUT,
});

export const login = (props: LoginProps) => async (
    dispatch: ReduxDispatch,
): Promise<any> => {
    const result = await AuthService.login(props);
    dispatch(loginAction(result));
};

export const logout = () => async (
    dispatch: ReduxDispatch,
): Promise<any> => {
    await AuthService.logout();
    dispatch(logoutAction());
};

export const register = (props: RegisterProps) => async (
    dispatch: ReduxDispatch,
): Promise<any> => {
    const result = await AuthService.register(props);
    dispatch(loginAction(result));
};
