import { Role } from '@customTypes/role';
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

export const updateRole =
    (user: User, newRole: Role) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await UserService.update({
            id: user.id,
            role: newRole,
        });
        dispatch(upsertUsersAction([result]));
    };
