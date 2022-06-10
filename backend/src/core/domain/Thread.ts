/* eslint-disable import/no-cycle */
import Message from './Message';
import Post from './Post';

interface Thread {
    id: string;
    createdAt: Date;
    subject: string;
    messages: Message[];
    post?: Post;
}

export default Thread;
