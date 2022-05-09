import { Organization } from '@services/organizations';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { initialState, OrganizationActionTypes, OrganizationState, UPSERT } from './types';

const organizationsReducer = (
    // eslint-disable-next-line default-param-last
    state = initialState,
    action: OrganizationActionTypes
): OrganizationState => {
    switch (action.type) {
        case UPSERT:
            return {
                ...state,
                data: uniq<Organization>([...action.organizations, ...state.data], ['id']),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default organizationsReducer;
