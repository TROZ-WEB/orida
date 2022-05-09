import { Poll as PollType, PollConverter } from '@services/polls';

export enum PostType {
    Poll = 'POLL',
}

interface Post {
    id: string;
    date: Date;
    type: PostType;
    poll?: PollType;
}

export const PostConverter = {
    fromApi(data: any): Post {
        return {
            id: data.id,
            date: data.date,
            type: data.type,
            poll: PollConverter.fromApi(data.poll),
        };
    },
};

export default Post;
