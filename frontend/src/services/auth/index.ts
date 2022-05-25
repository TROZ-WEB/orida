import { User, UserConverter } from '@services/users';
import { GET, POST } from '@utils/http';

import { Auth, AuthConverter, AuthError, LoginProps, RegisterProps } from './types';

async function login({ email, password }: LoginProps): Promise<User> {
    try {
        const response = await POST<User>('/api/auth/login', { email, password });

        return UserConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::login Unhandled error');
    }
}

async function register(props: RegisterProps) {
    try {
        const response = await POST<Auth>('/api/auth/register', { ...props });

        return AuthConverter.fromApi(response);
    } catch (error: any) {
        if (error.status === 409) {
            throw Error(AuthError.RegisterEmailAlreadyInUse);
        }
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::register  Unhandled error');
    }
}

async function logout() {
    try {
        await POST('/api/auth/logout');

        return true;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::logout  Unhandled error');
    }
}

async function getAuth(): Promise<User | null> {
    try {
        const result = await GET<User>('/api/auth/getAuth');

        return UserConverter.fromApi(result);
    } catch (error: any) {
        if (error.status === 404) {
            return null;
        }
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::getAuth  Unhandled error');
    }
}

const AuthService = {
    login,
    logout,
    getAuth,
    register,
};

export default AuthService;
export * from './types';
