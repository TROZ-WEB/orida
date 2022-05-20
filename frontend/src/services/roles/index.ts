import { GET } from '@utils/http';

import { Role, RoleConverter } from './types';

async function getAll(): Promise<Role[]> {
    try {
        const response = await GET<Role[]>('/api/roles/');

        return response.map(RoleConverter.fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('RolesService::getAll Unhandled error');
    }
}

const RolesService = {
    getAll,
};

export default RolesService;
export * from './types';
