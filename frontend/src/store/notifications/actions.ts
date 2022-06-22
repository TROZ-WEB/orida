import { ReduxDispatch } from '@hooks/useThunkDispatch';
import NotificationService, {
    CreateProps,
    NotificationState,
    UpdateProps,
} from '@services/notifications';

import { NotificationActionTypes, UPSERT } from './types';

export const upsertAction = (notifications: NotificationState[]): NotificationActionTypes => ({
    type: UPSERT,
    notifications,
});

export const create = (props: CreateProps) => {
    return async (): Promise<void> => {
        await NotificationService.create(props);
    };
};

export const update = (props: UpdateProps) => {
    return async (): Promise<void> => {
        await NotificationService.update(props);
    };
};

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await NotificationService.getAll();
        dispatch(upsertAction(result));
    };
