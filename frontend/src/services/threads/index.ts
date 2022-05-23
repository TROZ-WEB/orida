import { GET, POST } from '@utils/http';

import { Thread, ThreadConverter } from './types';

type CreateProps = {
    project: string;
    subject: string;
};
async function create(props: CreateProps): Promise<Thread> {
    try {
        const response = await POST<Thread>('/api/threads/', props);

        return ThreadConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ThreadService::create Unhandled error');
    }
}

async function getOne(id: string): Promise<Thread> {
    try {
        const response = await GET<Thread>(`/api/threads/${id}`);

        return ThreadConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ThreadService::getOne Unhandled error');
    }
}

const ThreadService = {
    create,
    getOne,
};

export default ThreadService;
export * from './types';
