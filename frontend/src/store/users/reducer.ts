import { User } from '@services/users';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { initialState, UPSERT_USERS, UsersActionTypes, UsersState } from './types';

/* eslint-disable-next-line default-param-last */
const reducer = (state = initialState, action: UsersActionTypes): UsersState => {
    switch (action.type) {
        case UPSERT_USERS:
            return {
                ...state,
                data: uniq<User>([...action.users, ...state.data], ['id']),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
