/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import PollResponseDomain from '../../../core/domain/PollResponse';
import BaseColumns from './BaseColumns.entity';
import Poll from './Poll.entity';
import User from './User.entity';

@Entity('poll-response')
export default class PollResponse extends BaseColumns {
    @ManyToOne(() => Poll, (poll) => poll.responses)
    @JoinColumn({ name: 'poll' })
        poll!: Poll;

    @ManyToOne(() => User, (user) => user.pollResponses)
    @JoinColumn({ name: 'user' })
        user!: User;

    toDomain(): PollResponseDomain {
        return ({
            id: this.id,
            poll: this.poll?.toDomain(),
            user: this.user?.toDomain(),
        });
    }
}
