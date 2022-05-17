/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Thread as ThreadDomain } from '../../../domain/Thread';
import BaseColumns from './BaseColumns';
import { Post } from './Post';

@Entity('thread')
class Thread extends BaseColumns {
    @OneToOne(() => Post, (post) => post.thread)
    @JoinColumn({ name: 'post' })
        post?: Post;

    @Column({ type: 'character varying', nullable: false })
        subject: string;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        post: Post,
        subject: string,
    ) {
        super(id, createdAt, modifiedAt);
        this.post = post;
        this.subject = subject;
    }

    toDomain(): ThreadDomain {
        return ({
            id: this.id,
            post: this.post?.toDomain(),
            createdAt: this.createdAt,
            subject: this.subject,
        });
    }
}

export { Thread };
