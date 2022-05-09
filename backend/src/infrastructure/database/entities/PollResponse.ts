/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PollResponse as PollResponseDomain } from '../../../domain/PollResponse';
import BaseColumns from './BaseColumns';
import { Poll } from './Poll';
import { User } from './User';

@Entity('poll-response')
class PollResponse extends BaseColumns {
    @ManyToOne(() => Poll, (poll) => poll.responses)
    @JoinColumn({ name: 'poll' })
        poll: Poll;

    @ManyToOne(() => User, (user) => user.pollResponses)
    @JoinColumn({ name: 'user' })
        user: User;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        poll: Poll,
        user: User,
    ) {
        super(id, createdAt, modifiedAt);
        this.poll = poll;
        this.user = user;
    }

    toDomain(): PollResponseDomain {
        return ({
            id: this.id,
            poll: this.poll?.toDomain(),
            user: this.user?.toDomain(),
        });
    }
}

export { PollResponse };
