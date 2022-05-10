import { GET } from '@utils/http';

import { Environment, EnvironmentConverter } from './types';

async function getAll(): Promise<Environment> {
    try {
        const response = await GET<Environment>('/api/environment/');

        return EnvironmentConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('EnvironmentService::getAll Unhandled error');
    }
}

const EnvironmentService = {
    getAll,
};

export default EnvironmentService;
export * from './types';
