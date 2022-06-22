/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Notification as NotificationDomain, NotificationType } from '../../../domain/Notification';
import BaseColumns from './BaseColumns';
import { NotificationState } from './NotificationState';
import { Organization } from './Organization';
import { Project } from './Project';

@Entity('notification')
class Notification extends BaseColumns {
    @ManyToOne(() => NotificationState, (notificationState: NotificationState) => notificationState.notification)
    @JoinColumn({ name: 'users' })
        // Lists the users that will recieve the notification, with the status of the notif (new or already seen)
        users: NotificationState[];

    @Column({ type: 'enum', enum: NotificationType, default: NotificationType.admin })
        type: NotificationType;

    @Column({ type: 'character varying' })
        text: string;

    @Column({ type: 'character varying' })
        link: string;

    @ManyToOne(() => Project)
    @JoinColumn({ name: 'project' })
        project: Project | undefined;

    @ManyToOne(() => Organization)
    @JoinColumn({ name: 'organization' })
        organization: Organization | undefined;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        users: NotificationState[],
        type: NotificationType,
        text: string,
        link: string,
        project: Project | undefined,
        organization: Organization | undefined,
    ) {
        super(id, createdAt, modifiedAt);
        this.users = users;
        this.type = type;
        this.text = text;
        this.link = link;
        this.project = project;
        this.organization = organization;
    }

    toDomain(): NotificationDomain {
        return {
            id: this.id,
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt,
            users: this.users ? this.users.map((user) => user.toDomain()) : [],
            type: this.type,
            text: this.text,
            link: this.link,
            project: this.project?.toDomain() || undefined,
            organization: this.organization?.toDomain() || undefined,
        };
    }
}

export { Notification };
