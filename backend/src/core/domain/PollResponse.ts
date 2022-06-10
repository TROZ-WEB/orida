/* eslint-disable import/no-cycle */
import Poll from './Poll';
import User from './User';

interface PollResponse {
    id: string;
    poll: Poll;
    user: User;
}

export default PollResponse;
