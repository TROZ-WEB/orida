import { Status } from '@services/status';
import { GlobalActionTypes } from '@store/_global/types';

export const UPSERT = 'STATUS_UPSERT';

export interface Upsert {
    type: typeof UPSERT;
    status: Status[];
}

export type StatusActionTypes = GlobalActionTypes | Upsert;

export interface StatusState {
    data: Status[];
}

export const initialState: StatusState = {
    data: [],
};
