/* eslint-disable import/no-cycle */
import Poll from './Poll';
import Project from './Project';
import Thread from './Thread';

export type PostType = 'POLL' | 'THREAD' | 'NONE';

interface Post {
    id: string;
    type: PostType;
    date: Date;
    project: Project;
    poll: Poll | undefined;
    thread: Thread | undefined;
}

export default Post;
