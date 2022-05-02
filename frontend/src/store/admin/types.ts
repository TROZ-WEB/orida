import { User } from '@services/users/types';
import { GlobalActionTypes } from '@store/_global/types';

export const ADD_USERS = 'ADMIN_ADD_USERS';

export interface AddUsers {
    type: typeof ADD_USERS;
    users: User[];
}

export type AdminActionTypes = GlobalActionTypes | AddUsers;

export interface AdminState {
    users: User[];
}

export const initialState: AdminState = {
    users: [],
};
