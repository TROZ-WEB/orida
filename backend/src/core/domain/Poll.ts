/* eslint-disable import/no-cycle */
import PollResponse, { pollResponseSnapshot } from './PollResponse';
import Post, { postSnapshot } from './Post';

interface Poll {
    id: string;
    post: Post;
    externalPollId: string;
    responses: PollResponse[];
    answered?: boolean; // true if the user has already answered this poll/false if not/undefined if not relevant
}

export const pollSnapshot = (poll: Poll): Poll => Object.freeze({
    ...poll,
    responses: poll.responses.map(pollResponseSnapshot),
    post: postSnapshot(poll.post),
});

export default Poll;
