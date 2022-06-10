/* eslint-disable import/no-cycle */
import PollResponse from './PollResponse';
import Post from './Post';

interface Poll {
    id: string;
    post: Post;
    externalPollId: string;
    responses: PollResponse[];
    answered?: boolean; // true if the user has already answered this poll/false if not/undefined if not relevant
}

export default Poll;
