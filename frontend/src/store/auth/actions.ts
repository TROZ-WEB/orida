import { ReduxDispatch } from '@hooks/useThunkDispatch';
import AuthService, { LoginProps, RegisterProps } from '@services/auth';
import { resetStoreAction } from '@store/_global/actions';

import { AuthActionTypes, GET_AUTH, GetAuth, LOGOUT } from './types';

export const getAuthAction = (payload: Omit<GetAuth, 'type'>): AuthActionTypes => ({
    type: GET_AUTH,
    ...payload,
});

export const logoutAction = (): AuthActionTypes => ({
    type: LOGOUT,
});

export const login =
    (props: LoginProps) =>
    async (dispatch: ReduxDispatch): Promise<any> => {
        const result = await AuthService.login(props);
        dispatch(getAuthAction(result));
    };

export const logout =
    () =>
    async (dispatch: ReduxDispatch): Promise<any> => {
        await AuthService.logout();
        dispatch(logoutAction());
        dispatch(resetStoreAction());
    };

export const register =
    (props: RegisterProps) =>
    async (dispatch: ReduxDispatch): Promise<any> => {
        const result = await AuthService.register(props);
        dispatch(getAuthAction(result));
    };

export const getAuth =
    () =>
    async (dispatch: ReduxDispatch): Promise<any> => {
        const result = await AuthService.getAuth();
        if (result === null) {
            dispatch(logout());
        } else {
            dispatch(getAuthAction(result));
        }
    };
