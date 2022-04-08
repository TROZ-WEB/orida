import './style.css';

import { toast } from 'react-toastify';

export enum NotificationType {
    Success,
    Error,
    Warning,
    Info,
    Default,
}

function notify(type: NotificationType, content: string) {
    switch (type) {
        case NotificationType.Success:
            return toast.success(content);
        case NotificationType.Error:
            return toast.error(content);
        case NotificationType.Warning:
            return toast.warning(content);
        case NotificationType.Info:
            return toast.info(content);
        case NotificationType.Default:
        default:
            return toast(content);
    }
}

export default notify;
