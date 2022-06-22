/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import { Notification } from './Notification';
import { User } from './User';

class NotificationState {
    id: string;

    user: User;

    notification: Notification;

    isNew: boolean; // Already seen by the user or not

    constructor(
        user: User,
        notification: Notification,
        isNew: boolean,
    ) {
        this.id = uuidv4();
        this.user = user;
        this.notification = notification;
        this.isNew = isNew;
    }
}

export { NotificationState };
