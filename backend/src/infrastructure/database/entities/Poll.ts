/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Poll as PollDomain } from '../../../domain/Poll';
import BaseColumns from './BaseColumns';
import { Post } from './Post';

@Entity('poll')
class Poll extends BaseColumns {
    @OneToOne(() => Post, (post) => post.poll)
    @JoinColumn({ name: 'post' })
        post: Post;

    @Column({ type: 'character varying', unique: true })
        externalPollId: string;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        post: Post,
        externalPollId: string,
    ) {
        super(id, createdAt, modifiedAt);
        this.post = post;
        this.externalPollId = externalPollId;
    }

    toDomain(): PollDomain {
        return ({
            id: this.id,
            post: this.post?.toDomain(),
            externalPollId: this.externalPollId,
        });
    }
}

export { Poll };
