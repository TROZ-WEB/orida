/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { NotificationState as NotificationStateDomain } from '../../../domain/NotificationState';
import BaseColumns from './BaseColumns';
import { Notification } from './Notification';
import { User } from './User';

@Entity('notification-state')
class NotificationState extends BaseColumns {
    @ManyToOne(() => User, (user: User) => user.notifications, { eager: true })
    @JoinColumn({ name: 'user' })
        user: User;

    @ManyToOne(() => Notification, (notification: Notification) => notification.users, { eager: true })
    @JoinColumn({ name: 'notification' })
        notification: Notification;

    @Column({ type: 'boolean' })
        isNew: boolean;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        user: User,
        notification: Notification,
        isNew: boolean,
    ) {
        super(id, createdAt, modifiedAt);
        this.user = user;
        this.notification = notification;
        this.isNew = isNew;
    }

    toDomain(): NotificationStateDomain {
        return {
            id: this.id,
            user: this.user.toDomain(),
            notification: this.notification.toDomain(),
            isNew: this.isNew,
        };
    }
}

export { NotificationState };
