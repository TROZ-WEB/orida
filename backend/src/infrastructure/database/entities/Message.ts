/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Message as MessageDomain } from '../../../domain/Message';
import BaseColumns from './BaseColumns';
import { Thread } from './Thread';
import { User } from './User';

@Entity('messages')
class Message extends BaseColumns {
    @ManyToOne(() => Thread, (thread: Thread) => thread.messages, { cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'thread' })
        thread: Thread;

    @ManyToOne(() => User, (user: User) => user.messages, { cascade: ['insert', 'update'], eager: true })
    @JoinColumn({ name: 'author' })
        author: User;

    @Column({ type: 'character varying', nullable: false })
        content: string;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        thread: Thread,
        author: User,
        content: string,
    ) {
        super(id, createdAt, modifiedAt);
        this.thread = thread;
        this.author = author;
        this.content = content;
    }

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

export { Message };
