import { Role } from '@customTypes/role';
import { ReduxDispatch } from '@hooks/useThunkDispatch';
import UserService, { User } from '@services/users';

import { ADD_USERS, AdminActionTypes } from './types';

const addUsersAction = (users: User[]): AdminActionTypes => ({
    type: ADD_USERS,
    users,
});

export const getAllUsers =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await UserService.getAll();
        dispatch(addUsersAction(result));
    };

export const updateRole =
    (user: User, newRole: Role) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await UserService.update({
            id: user.id,
            role: newRole,
        });
        dispatch(addUsersAction([result]));
    };
