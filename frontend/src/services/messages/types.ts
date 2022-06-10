import { Thread } from '@services/threads';
import { User } from '@services/users';

export type Message = {
    id: string;
    createdAt: Date;
    thread: Thread;
    author: User;
    content: string;
};

export const MessageConverter = {
    fromApi(data: any): Message {
        return {
            id: data.id,
            createdAt: new Date(data.createdAt),
            thread: data.thread,
            author: data.author,
            content: data.content,
        };
    },
};

export type CreateProps = {
    threadId: string;
    authorId: string;
    content: string;
};

export type DeleteProps = {
    id: string;
};
