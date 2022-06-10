/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import PollDomain from '../../../core/domain/Poll';
import BaseColumns from './BaseColumns.entity';
import PollResponse from './PollResponse.entity';
import Post from './Post.entity';

@Entity('poll')
export default class Poll extends BaseColumns {
    @OneToOne(() => Post, (post) => post.poll)
    @JoinColumn({ name: 'post' })
        post!: Post;

    @Column({ type: 'character varying', unique: true })
        externalPollId!: string;

    @OneToMany(() => PollResponse, (response) => response.poll, { cascade: true })
        responses: PollResponse[] = [];

    toDomain(): PollDomain {
        return ({
            id: this.id,
            post: this.post?.toDomain(),
            externalPollId: this.externalPollId,
            responses: this.responses?.map((response) => response.toDomain()) || [],
        });
    }
}
