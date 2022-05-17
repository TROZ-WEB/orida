/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Poll } from './Poll';
import { Project } from './Project';
import { Thread } from './Thread';

export type PostType = 'POLL' | 'THREAD' | 'NONE';

class Post {
    id: string;

    project?: Project;

    type: PostType;

    poll?: Poll;

    thread?: Thread;

    date: Date;

    constructor(
        id: string,
        type: PostType,
        date: Date,
        project?: Project,
        poll?: Poll,
        thread?: Thread,
    ) {
        this.date = date;
        this.id = id;
        this.poll = poll;
        this.project = project;
        this.thread = thread;
        this.type = type;
    }
}

export { Post };
