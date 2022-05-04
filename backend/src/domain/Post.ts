/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Poll } from './Poll';
import { Project } from './Project';

type PostType = 'POLL' | 'EVENT';

class Post {
    id: string;

    project?: Project;

    type: PostType;

    poll?: Poll;

    date: Date;

    constructor(
        id: string,
        type: PostType,
        date: Date,
        project?: Project,
        poll?: Poll,
    ) {
        this.id = id;
        this.project = project;
        this.date = date;
        this.type = type;
        this.poll = poll;
    }
}

export { Post };
