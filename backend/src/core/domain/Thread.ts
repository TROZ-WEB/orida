/* eslint-disable import/no-cycle */
import Message, { messageSnapshot } from './Message';
import Post, { postSnapshot } from './Post';

interface Thread {
    id: string;
    createdAt: Date;
    subject: string;
    messages: Message[];
    post?: Post;
}

export const threadSnapshot = (thread: Thread): Thread => Object.freeze({
    ...thread,
    messages: thread.messages.map(messageSnapshot),
    post: thread.post ? postSnapshot(thread.post) : undefined,
});

export default Thread;
