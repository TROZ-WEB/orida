/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Poll as PollDomain } from '../../../domain/Poll';
import BaseColumns from './BaseColumns';
import { PollResponse } from './PollResponse';
import { Post } from './Post';

@Entity('poll')
class Poll extends BaseColumns {
    @OneToOne(() => Post, (post) => post.poll)
    @JoinColumn({ name: 'post' })
        post: Post;

    @Column({ type: 'character varying', unique: true })
        externalPollId: string;

    @OneToMany(() => PollResponse, (response) => response.poll, { cascade: true })
        responses?: PollResponse[];

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        post: Post,
        externalPollId: string,
        responses: PollResponse[],
    ) {
        super(id, createdAt, modifiedAt);
        this.post = post;
        this.externalPollId = externalPollId;
        this.responses = responses;
    }

    toDomain(): PollDomain {
        return ({
            id: this.id,
            post: this.post?.toDomain(),
            externalPollId: this.externalPollId,
            responses: this.responses?.map((response) => response.toDomain()) || [],
        });
    }
}

export { Poll };
