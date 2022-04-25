import { ReduxDispatch } from '@hooks/useThunkDispatch';
import StatusService, { Status } from '@services/status';

import { ADD, StatusActionTypes } from './types';

export const addAction = (status: Status[]): StatusActionTypes => ({
    type: ADD,
    status,
});

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await StatusService.getAll();
        dispatch(addAction(result));
    };
