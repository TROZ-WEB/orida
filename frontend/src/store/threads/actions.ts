import { ReduxDispatch } from '@hooks/useThunkDispatch';
import ThreadsService, { Thread } from '@services/threads';

import { ThreadsActionTypes, UPSERT } from './types';

export const upsertAction = (threads: Thread[]): ThreadsActionTypes => ({
    type: UPSERT,
    threads,
});

export const getOne =
    (id: string) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ThreadsService.getOne(id);
        if (result) {
            dispatch(upsertAction([result]));
        }
    };
