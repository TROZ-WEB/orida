import { Organization } from '@services/organizations';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { ADD, initialState, OrganizationActionTypes, OrganizationState } from './types';

const organizationsReducer = (
    // eslint-disable-next-line default-param-last
    state = initialState,
    action: OrganizationActionTypes
): OrganizationState => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                data: uniq<Organization>([...state.data, ...action.organizations], ['id']),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default organizationsReducer;
