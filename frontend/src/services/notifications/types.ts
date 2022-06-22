import { Organization, OrganizationConverter } from '@services/organizations';
import { Project, ProjectConverter } from '@services/projects';
import { User, UserConverter } from '@services/users';

export type NotificationState = {
    id: string;
    notification: Notification;
    user: User;
    isNew: boolean;
};

export const NotificationStateConverter = {
    fromApi(data: any): NotificationState {
        return {
            id: data.id,
            // remove rule because functions are exported
            /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
            notification: NotificationConverter.fromApi(data.notification),
            user: UserConverter.fromApi(data.user),
            isNew: data.isNew,
        };
    },
};

export enum NotificationType {
    admin = 'ADMIN',
    project = 'PROJECT',
    organization = 'ORGANIZATION',
}

export type Notification = {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    type: NotificationType;
    text: string;
    link: string;
    project: Project;
    organization: Organization;
};

export const NotificationConverter = {
    fromApi(data: any): Notification {
        return {
            id: data.id,
            createdAt: data.createdAt,
            modifiedAt: data.modifiedAt,
            type: data.type,
            text: data.text,
            link: data.link,
            project: data.project && ProjectConverter.fromApi(data.project),
            organization: data.organization && OrganizationConverter.fromApi(data.organization),
        };
    },
};

export type CreateProps = {
    usersIds: string[];
    type: NotificationType;
    text: string;
    link: string;
    projectId?: string;
    organizationId?: string;
};

export type UpdateProps = {
    notificationStateIds: string[];
};

export type getAllProps = {
    userId: string;
};
