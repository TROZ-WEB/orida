/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Poll } from './Poll';
import { User } from './User';

class PollResponse {
    id: string;

    poll: Poll; // poll of the response

    user: User; // user that send the response

    constructor(
        id: string,
        poll: Poll,
        user: User,
    ) {
        this.id = id;
        this.poll = poll;
        this.user = user;
    }
}

export { PollResponse };
