import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { initialState, PollActionTypes, PollResults, PollState, UPSERT_RESULTS } from './types';

/* eslint-disable-next-line default-param-last */
const pollsReducer = (state = initialState, action: PollActionTypes): PollState => {
    switch (action.type) {
        case UPSERT_RESULTS:
            return {
                ...state,
                results: uniq<PollResults>([action.results, ...state.results], ['pollId']),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default pollsReducer;
