import { User } from '@services/users/types';
import { GlobalActionTypes } from '@store/_global/types';

export const UPSERT_USERS = 'ADMIN_UPSERT_USERS';

export interface upsertUsers {
    type: typeof UPSERT_USERS;
    users: User[];
}

export type AdminActionTypes = GlobalActionTypes | upsertUsers;

export interface AdminState {
    users: User[];
}

export const initialState: AdminState = {
    users: [],
};
