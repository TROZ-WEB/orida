/* eslint-disable import/prefer-default-export */
import { ReduxDispatch } from '@hooks/useThunkDispatch';
import UserService, { User } from '@services/users';

import { UPSERT_USERS, UsersActionTypes } from './types';

const upsertAction = (users: User[]): UsersActionTypes => ({
    type: UPSERT_USERS,
    users,
});

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await UserService.getAll();
        dispatch(upsertAction(result));
    };

export const getOne =
    (id: string) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await UserService.getOne(id);
        if (result) {
            dispatch(upsertAction([result]));
        }
    };
