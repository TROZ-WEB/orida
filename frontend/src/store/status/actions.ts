import { ReduxDispatch } from '@hooks/useThunkDispatch';
import StatusService, { Status } from '@services/status';

import { StatusActionTypes, UPSERT } from './types';

export const upsertAction = (status: Status[]): StatusActionTypes => ({
    type: UPSERT,
    status,
});

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await StatusService.getAll();
        dispatch(upsertAction(result));
    };
