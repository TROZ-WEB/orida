/* eslint-disable import/no-cycle */
import Poll, { pollSnapshot } from './Poll';
import Project, { projectSnapshot } from './Project';
import Thread, { threadSnapshot } from './Thread';

export type PostType = 'POLL' | 'THREAD' | 'NONE';

interface Post {
    id: string;
    type: PostType;
    date: Date;
    project: Project;
    poll?: Poll;
    thread?: Thread;
}

export const postSnapshot = (post: Post): Post => Object.freeze({
    ...post,
    project: projectSnapshot(post.project),
    poll: post.poll ? pollSnapshot(post.poll) : undefined,
    thread: post.thread ? threadSnapshot(post.thread) : undefined,
});

export default Post;
