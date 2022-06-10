/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import MessageDomain from '../../../core/domain/Message';
import BaseColumns from './BaseColumns.entity';
import Thread from './Thread.entity';
import User from './User.entity';

@Entity('messages')
export default class Message extends BaseColumns {
    @ManyToOne(() => Thread, (thread: Thread) => thread.messages, { cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'thread' })
        thread!: Thread;

    @ManyToOne(() => User, (user: User) => user.messages, { cascade: ['insert', 'update'], eager: true })
    @JoinColumn({ name: 'author' })
        author!: User;

    @Column({ type: 'character varying', nullable: false })
        content!: string;

    toDomain(): MessageDomain {
        return ({
            id: this.id,
            createdAt: this.createdAt,
            thread: this.thread?.toDomain(),
            author: this.author?.toDomain(),
            content: this.content,
        });
    }
}
