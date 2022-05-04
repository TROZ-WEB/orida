/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Post } from './Post';

class Poll {
    id: string;

    post: Post;

    externalPollId: string;

    constructor(
        id: string,
        post: Post,
        externalPollId: string,
    ) {
        this.id = id;
        this.post = post;
        this.externalPollId = externalPollId;
    }
}

export { Poll };
