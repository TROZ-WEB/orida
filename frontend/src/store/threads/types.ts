import { Thread } from '@services/threads';
import { GlobalActionTypes } from '@store/_global/types';

export const UPSERT = 'THREAD_UPSERT';

export interface Upsert {
    type: typeof UPSERT;
    threads: Thread[];
}

export type ThreadsActionTypes = GlobalActionTypes | Upsert;

export interface ThreadsState {
    data: Thread[];
}

export const initialState: ThreadsState = {
    data: [],
};
