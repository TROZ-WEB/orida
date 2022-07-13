/* eslint-disable import/no-cycle */
import Poll, { pollSnapshot } from './Poll';
import User, { userSnapshot } from './User';

interface PollResponse {
    id: string;
    poll: Poll;
    user: User;
}

export const pollResponseSnapshot = (pollResponse: PollResponse): PollResponse => Object.freeze({
    ...pollResponse,
    poll: pollSnapshot(pollResponse.poll),
    user: userSnapshot(pollResponse.user),
});

export default PollResponse;
