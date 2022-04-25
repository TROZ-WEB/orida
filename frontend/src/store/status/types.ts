import { Status } from '@services/status';
import { GlobalActionTypes } from '@store/_global/types';

export const ADD = 'STATUS_ADD';

export interface Add {
    type: typeof ADD;
    status: Status[];
}

export type StatusActionTypes = GlobalActionTypes | Add;

export interface StatusState {
    data: Status[];
}

export const initialState: StatusState = {
    data: [],
};
