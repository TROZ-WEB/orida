/* eslint-disable import/prefer-default-export */
import { ReduxDispatch } from '@hooks/useThunkDispatch';
import UserService, { User } from '@services/users';

import { AdminActionTypes, UPSERT_USERS } from './types';

const upsertUsersAction = (users: User[]): AdminActionTypes => ({
    type: UPSERT_USERS,
    users,
});

export const getAllUsers =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await UserService.getAll();
        dispatch(upsertUsersAction(result));
    };
