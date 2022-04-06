import { GET, HttpError, POST } from '@utils/http';

import { LoginProps, LoginResponse, RegisterProps } from './types';

async function login({ email, password }: LoginProps): Promise<LoginResponse> {
    try {
        const response = await POST<LoginResponse>('api/auth/login', { email, password });

        return response;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::login Unhandled error');
    }
}

async function register({ email, password }: RegisterProps) {
    try {
        const response = await POST('api/auth/register', { email, password });

        return response;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::register  Unhandled error');
    }
}

async function logout() {
    try {
        await POST('api/auth/logout');

        return true;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::logout  Unhandled error');
    }
}

async function me() {
    try {
        const result = await GET('api/auth/me');

        return result;
    } catch (error: any) {
        if (error.status == 404) {
            return null;
        }
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::me  Unhandled error');
    }
}

const AuthService = {
    login,
    logout,
    me,
    register,
};

export default AuthService;
export * from './types';
