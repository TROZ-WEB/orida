/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Column, Entity, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import ThreadDomain from '../../../core/domain/Thread';
import BaseColumns from './BaseColumns.entity';
import Message from './Message.entity';
import Post from './Post.entity';

@Entity('thread')
export default class Thread extends BaseColumns {
    @OneToOne(() => Post, (post) => post.thread)
    @JoinColumn({ name: 'post' })
        post!: Post;

    @OneToMany(() => Message, (message: Message) => message.thread, { eager: true, cascade: true })
        messages: Message[] = [];

    @Column({ type: 'character varying', nullable: false })
        subject!: string;

    toDomain(): ThreadDomain {
        return ({
            id: this.id,
            post: this.post?.toDomain(),
            createdAt: this.createdAt,
            subject: this.subject,
            messages: this.messages?.map((m) => m.toDomain()) || [],
        });
    }
}
