import { POST } from '@utils/http';

import { Poll, PollConverter } from './types';

type CreateProps = {
    project: string;
    question: string;
    responses: string[];
};
async function create(props: CreateProps): Promise<Poll> {
    try {
        const response = await POST<Poll>('/api/polls/', props);

        return PollConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('PollService::create Unhandled error');
    }
}

const PollService = {
    create,
};

export default PollService;
export * from './types';
