import { GET, POST } from '@utils/http';

import { Poll, PollConverter, PollResult } from './types';

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

async function getResults(pollId: string): Promise<PollResult[]> {
    try {
        const response = await GET<PollResult[]>(`/api/polls/${pollId}/results`);

        return response;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('PollService::create Unhandled error');
    }
}

const PollService = {
    create,
    getResults,
};

export default PollService;
export * from './types';
