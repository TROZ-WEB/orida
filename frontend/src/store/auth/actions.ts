import { ReduxDispatch } from "@hooks/useThunkDispatch";
import {
    SIGN_IN,
    SIGN_OUT,
    AuthActionTypes,
    Login,
    LOGIN,
} from "./types";
import { AppState } from "..";
import AuthService, { LoginProps } from "@services/auth";

export const loginAction = (payload: Omit<Login, "type"> ): AuthActionTypes => ({
    type: LOGIN,
    ...payload,
});

export const signIn = (token: string): AuthActionTypes => ({
    type: SIGN_IN,
    token,
});

export const signOut = (): AuthActionTypes => ({
    type: SIGN_OUT,
});

export const login = (props: LoginProps) => async (
    dispatch: ReduxDispatch,
): Promise<any> => {
    const result = await AuthService.login(props);
    dispatch(loginAction(result));
};

export const register = (props: LoginProps) => async (
    dispatch: ReduxDispatch,
    getState: () => AppState
): Promise<any> => {
    const actionResult = await AuthService.register(props);
    console.error({ actionResult });
    throw Error("Store::Auth::Register Missing implementation");
};
