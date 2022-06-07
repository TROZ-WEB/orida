import { User } from '@services/users/types';
import { GlobalActionTypes } from '@store/_global/types';

export const UPSERT_USERS = 'USERS_UPSERT_USERS';

export interface upsertUsers {
    type: typeof UPSERT_USERS;
    users: User[];
}

export type UsersActionTypes = GlobalActionTypes | upsertUsers;

export interface UsersState {
    data: User[];
}

export const initialState: UsersState = {
    data: [],
};
