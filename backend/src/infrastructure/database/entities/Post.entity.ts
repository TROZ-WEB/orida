/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import PostDomain, { PostType as PostTypeDomain } from '../../../core/domain/Post';
import BaseColumns from './BaseColumns.entity';
import Poll from './Poll.entity';
import Project from './Project.entity';
import Thread from './Thread.entity';

@Entity('post')
export default class Post extends BaseColumns {
    @ManyToOne(() => Project, (project) => project.posts)
    @JoinColumn({ name: 'project' })
        project!: Project;

    @OneToOne(() => Poll, (poll) => poll.post, { eager: true })
        poll: Poll | undefined;

    @OneToOne(() => Thread, (thread) => thread.post, { eager: true })
        thread: Thread | undefined;

    computeType(): PostTypeDomain {
        if (this.poll) { return 'POLL'; }
        if (this.thread) { return 'THREAD'; }

        return 'NONE';
    }

    toDomain(): PostDomain {
        return ({
            id: this.id,
            type: this.computeType(),
            date: this.createdAt,
            project: this.project?.toDomain(),
            poll: this.poll ? this.poll.toDomain() : undefined,
            thread: this.thread ? this.thread.toDomain() : undefined,
        });
    }
}
