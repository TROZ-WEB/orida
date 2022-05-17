/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Post } from './Post';

class Thread {
    id: string;

    post?: Post;

    createdAt: Date;

    subject: string;

    constructor(
        id: string,
        createdAt: Date,
        subject: string,
        post?: Post,
    ) {
        this.id = id;
        this.post = post;
        this.createdAt = createdAt;
        this.subject = subject;
    }
}

export { Thread };
