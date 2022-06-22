import { NotificationState } from '@services/notifications';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { initialState, NotificationActionTypes, NotificationStateState, UPSERT } from './types';

const notificationsReducer = (
    // eslint-disable-next-line default-param-last
    state = initialState,
    action: NotificationActionTypes
): NotificationStateState => {
    switch (action.type) {
        case UPSERT:
            return {
                ...state,
                data: uniq<NotificationState>([...action.notifications, ...state.data], ['id']),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default notificationsReducer;
