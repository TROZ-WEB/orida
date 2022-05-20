import { Role } from '@services/roles';
import { GlobalActionTypes } from '@store/_global/types';

export const UPSERT = 'ROLES_UPSERT';

export interface Upsert {
    type: typeof UPSERT;
    roles: Role[];
}

export type RolesActionTypes = GlobalActionTypes | Upsert;

export interface RolesState {
    data: Role[];
}

export const initialState: RolesState = {
    data: [],
};
