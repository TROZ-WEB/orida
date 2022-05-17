import { Poll as PollType, PollConverter } from '@services/polls';
import { Thread as ThreadType, ThreadConverter } from '@services/threads';

export enum PostType {
    Poll = 'POLL',
    Thread = 'THREAD',
}

interface Post {
    id: string;
    date: Date;
    type: PostType;
    poll?: PollType;
    thread?: ThreadType;
}

export const PostConverter = {
    fromApi(data: any): Post {
        return {
            id: data.id,
            date: data.date,
            type: data.type,
            poll: data.poll ? PollConverter.fromApi(data.poll) : undefined,
            thread: data.thread ? ThreadConverter.fromApi(data.thread) : undefined,
        };
    },
};

export default Post;
