/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Thread } from './Thread';
import { User } from './User';

class Message {
    id: string;

    createdAt: Date;

    thread: Thread;

    author: User;

    content: string;

    isModerated: boolean;

    constructor(
        id: string,
        createdAt: Date,
        thread: Thread,
        author: User,
        content: string,
        isModerated: boolean,
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.thread = thread;
        this.author = author;
        this.content = content;
        this.isModerated = isModerated;
    }
}

export { Message };
