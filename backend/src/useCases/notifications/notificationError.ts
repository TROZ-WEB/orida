class NotificationError extends Error { }

export default NotificationError;

export enum NotificationErrorType {
    NotFound = 'Notification not found',
}
