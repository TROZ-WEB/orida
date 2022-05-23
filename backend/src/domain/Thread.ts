/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Message } from './Message';
import { Post } from './Post';

class Thread {
    id: string;

    post?: Post;

    createdAt: Date;

    subject: string;

    messages: Message[];

    constructor(
        id: string,
        createdAt: Date,
        subject: string,
        messages: Message[],
        post?: Post,
    ) {
        this.id = id;
        this.post = post;
        this.createdAt = createdAt;
        this.messages = messages;
        this.subject = subject;
    }
}

export { Thread };
