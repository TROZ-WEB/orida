import { POST } from '@utils/http';

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

const ThreadService = {
    create,
};

export default ThreadService;
export * from './types';
