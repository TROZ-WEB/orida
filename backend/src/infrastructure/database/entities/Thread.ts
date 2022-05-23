/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Column, Entity, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Thread as ThreadDomain } from '../../../domain/Thread';
import BaseColumns from './BaseColumns';
import { Message } from './Message';
import { Post } from './Post';

@Entity('thread')
class Thread extends BaseColumns {
    @OneToOne(() => Post, (post) => post.thread)
    @JoinColumn({ name: 'post' })
        post?: Post;

    @OneToMany(() => Message, (message: Message) => message.thread, { cascade: true })
    @JoinColumn({ name: 'messages' })
        messages: Message[];

    @Column({ type: 'character varying', nullable: false })
        subject: string;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        post: Post,
        subject: string,
        messages: Message[],
    ) {
        super(id, createdAt, modifiedAt);
        this.post = post;
        this.subject = subject;
        this.messages = messages;
    }

    toDomain(): ThreadDomain {
        return ({
            id: this.id,
            post: this.post?.toDomain(),
            createdAt: this.createdAt,
            subject: this.subject,
            messages: this.messages?.map((m) => m.toDomain()),
        });
    }
}

export { Thread };
