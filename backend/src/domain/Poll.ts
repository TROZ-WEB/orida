/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { PollResponse } from './PollResponse';
import { Post } from './Post';

class Poll {
    id: string;

    post: Post;

    externalPollId: string;

    responses: PollResponse[];

    // true if the calling user has already answered this poll, false if not, undefined if not relevant
    answered?: boolean;

    constructor(
        id: string,
        post: Post,
        externalPollId: string,
        responses: PollResponse[],
        answered?: boolean,
    ) {
        this.answered = answered;
        this.externalPollId = externalPollId;
        this.id = id;
        this.post = post;
        this.responses = responses;
    }
}

export { Poll };
