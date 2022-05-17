/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Post as PostDomain, PostType as PostTypeDomain } from '../../../domain/Post';
import BaseColumns from './BaseColumns';
import { Poll } from './Poll';
import { Project } from './Project';
import { Thread } from './Thread';

@Entity('post')
class Post extends BaseColumns {
    @ManyToOne(() => Project, (project) => project.posts)
    @JoinColumn({ name: 'project' })
        project: Project;

    @OneToOne(() => Poll, (poll) => poll.post, { eager: true })
        poll?: Poll;

    @OneToOne(() => Thread, (thread) => thread.post, { eager: true })
        thread?: Thread;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        project: Project,
        poll: Poll,
        thread: Thread,
    ) {
        super(id, createdAt, modifiedAt);
        this.project = project;
        this.poll = poll;
        this.thread = thread;
    }

    computeType(): PostTypeDomain {
        if (this.poll) { return 'POLL'; }
        if (this.thread) { return 'THREAD'; }

        return 'NONE';
    }

    toDomain(): PostDomain {
        return new PostDomain(
            this.id,
            this.computeType(),
            this.createdAt,
            this.project?.toDomain(),
            this.poll ? this.poll.toDomain() : undefined,
            this.thread ? this.thread.toDomain() : undefined,
        );
    }
}

export { Post };
