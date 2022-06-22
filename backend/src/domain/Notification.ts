/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import { NotificationState } from './NotificationState';
import { Organization } from './Organization';
import { Project } from './Project';

export enum NotificationType {
    admin = 'ADMIN',
    project = 'PROJECT',
    organization = 'ORGANIZATION',
}

class Notification {
    id: string;

    createdAt: Date;

    modifiedAt: Date;

    // Lists the users that will recieve the notification, with the status of the notif (new or already seen)
    users: NotificationState[];

    type: NotificationType;

    text: string;

    link: string;

    project: Project | undefined;

    organization: Organization | undefined;

    constructor(
        createdAt: Date,
        modifiedAt: Date,
        users: NotificationState[],
        type: NotificationType,
        text: string,
        link: string,
        project: Project | undefined,
        organization: Organization | undefined,
    ) {
        this.id = uuidv4();
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.users = users;
        this.type = type;
        this.text = text;
        this.link = link;
        this.project = project;
        this.organization = organization;
    }
}

export { Notification };
