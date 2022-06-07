import { GET, PATCH } from '@utils/http';

import { User, UserConverter } from './types';

async function getAll(): Promise<User[]> {
    try {
        const response = await GET<User[]>('/api/users/');

        return response.map(UserConverter.fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('UserService::getAll Unhandled error');
    }
}

async function getOne(id: string): Promise<User | undefined> {
    try {
        const response = await GET<User | undefined>(`/api/users/${id}`);

        return UserConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('UserService::getOne Unhandled error');
    }
}

interface UpdateProps extends Partial<User> {
    id: string;
}

async function update(updated: UpdateProps): Promise<User> {
    try {
        const response = await PATCH<User>(`/api/users/${updated.id}`, { user: updated });

        return UserConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('UserService::getAll Unhandled error');
    }
}

const UserService = {
    getAll,
    getOne,
    update,
};

export default UserService;
export * from './types';
