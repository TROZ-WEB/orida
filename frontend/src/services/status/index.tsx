import { GET } from '@utils/http';

import { fromApi, Status } from './types';

async function getAll(): Promise<Status[]> {
    try {
        const response = await GET<Status[]>('/api/status/');

        return response.map(fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('StatusService::getAll Unhandled error');
    }
}

const StatusService = {
    getAll,
};

export default StatusService;
export * from './types';
