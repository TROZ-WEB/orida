import { Thread } from '@services/threads';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { initialState, ThreadsActionTypes, ThreadsState, UPSERT } from './types';

const threadReducer = (
    /* eslint-disable-next-line default-param-last */
    state = initialState,
    action: ThreadsActionTypes
): ThreadsState => {
    switch (action.type) {
        case UPSERT:
            return {
                ...state,
                data: uniq<Thread>([...action.threads, ...state.data], ['id']),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default threadReducer;
