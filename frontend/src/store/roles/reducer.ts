import { Role } from '@services/roles';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { initialState, RolesActionTypes, RolesState, UPSERT } from './types';

const rolesReducer = (
    /* eslint-disable-next-line default-param-last */
    state = initialState,
    action: RolesActionTypes
): RolesState => {
    switch (action.type) {
        case UPSERT:
            return {
                ...state,
                data: uniq<Role>([...action.roles, ...state.data], ['id']),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default rolesReducer;
