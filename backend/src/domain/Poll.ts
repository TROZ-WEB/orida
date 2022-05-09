/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { PollResponse } from './PollResponse';
import { Post } from './Post';

class Poll {
    id: string;

    post: Post;

    externalPollId: string;

    responses: PollResponse[];

    constructor(
        id: string,
        post: Post,
        externalPollId: string,
        responses: PollResponse[],
    ) {
        this.id = id;
        this.post = post;
        this.externalPollId = externalPollId;
        this.responses = responses;
    }
}

export { Poll };
