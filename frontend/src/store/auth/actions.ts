import { ReduxDispatch } from "@hooks/useThunkDispatch";
import {
    SIGN_IN,
    SIGN_OUT,
    AuthActionTypes,
} from "./types";
import { AppState } from "..";
import AuthService, { LoginProps } from "@services/auth";

export const signIn = (token: string): AuthActionTypes => ({
    type: SIGN_IN,
    token,
});

export const signOut = (): AuthActionTypes => ({
    type: SIGN_OUT,
});

interface AuthResponse {
    id: string;
    email: string;
}

export const login = (props: LoginProps) => async (
    dispatch: ReduxDispatch,
    getState: () => AppState
): Promise<any> => {
    const result = AuthService.login(props);
};
