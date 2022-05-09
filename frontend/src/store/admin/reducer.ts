import { User } from '@services/users';
import { RESET_STORE } from '@store/_global/types';
import sortBy from '@utils/sortBy';
import uniq from '@utils/uniq';

import { AdminActionTypes, AdminState, initialState, UPSERT_USERS } from './types';

/* eslint-disable-next-line default-param-last */
const reducer = (state = initialState, action: AdminActionTypes): AdminState => {
    switch (action.type) {
        case UPSERT_USERS:
            return {
                ...state,
                users: uniq<User>([...action.users, ...state.users], ['id']).sort(
                    sortBy<User>('id')
                ),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
