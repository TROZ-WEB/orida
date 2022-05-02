import { GET, PATCH } from '@utils/http';

import { fromApi, User } from './types';

async function getAll(): Promise<User[]> {
    try {
        const response = await GET<User[]>('/api/users/');

        return response.map(fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('UserService::getAll Unhandled error');
    }
}

interface UpdateProps extends Partial<User> {
    id: string;
}

async function update(updated: UpdateProps): Promise<User> {
    try {
        const response = await PATCH<User>(`/api/users/${updated.id}`, { user: updated });

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('UserService::getAll Unhandled error');
    }
}

const UserService = {
    getAll,
    update,
};

export default UserService;
export * from './types';
