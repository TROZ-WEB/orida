import './style.css';

import { toast } from 'react-toastify';

export enum ToastNotificationType {
    Success,
    Error,
    Warning,
    Info,
    Default,
}

function notify(type: ToastNotificationType, content: string) {
    switch (type) {
        case ToastNotificationType.Success:
            return toast.success(content);
        case ToastNotificationType.Error:
            return toast.error(content);
        case ToastNotificationType.Warning:
            return toast.warning(content);
        case ToastNotificationType.Info:
            return toast.info(content);
        case ToastNotificationType.Default:
        default:
            return toast(content);
    }
}

export default notify;
