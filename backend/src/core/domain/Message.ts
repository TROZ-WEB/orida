/* eslint-disable import/no-cycle */
import Thread, { threadSnapshot } from './Thread';
import User, { userSnapshot } from './User';

interface Message {
    id: string;
    createdAt: Date;
    thread: Thread;
    author: User;
    content: string;
}

export const messageSnapshot = (message: Message): Message => Object.freeze({
    ...message,
    thread: threadSnapshot(message.thread),
    author: userSnapshot(message.author),
});

export default Message;
