import { Status } from '@services/status';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { initialState, StatusActionTypes, StatusState, UPSERT } from './types';

/* eslint-disable-next-line default-param-last */
const statusReducer = (state = initialState, action: StatusActionTypes): StatusState => {
    switch (action.type) {
        case UPSERT:
            return {
                ...state,
                data: uniq<Status>([...state.data, ...action.status], ['id']),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default statusReducer;
