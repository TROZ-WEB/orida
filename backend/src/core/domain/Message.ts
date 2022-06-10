/* eslint-disable import/no-cycle */
import Thread from './Thread';
import User from './User';

interface Message {
    id: string;
    createdAt: Date;
    thread: Thread;
    author: User;
    content: string;
}

export default Message;
