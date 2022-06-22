import { NotificationState } from '@services/notifications';
import { GlobalActionTypes } from '@store/_global/types';

export const UPSERT = 'NOTIFICATIONS_UPSERT';
export interface Upsert {
    type: typeof UPSERT;
    notifications: NotificationState[];
}

export type NotificationActionTypes = GlobalActionTypes | Upsert;

export interface NotificationStateState {
    data: NotificationState[];
}

export const initialState: NotificationStateState = {
    data: [],
};
