import { Message } from '@services/messages';
import { RESET_STORE } from '@store/_global/types';
import uniq from '@utils/uniq';

import { initialState, MessageActionTypes, MessageState, UPSERT } from './types';

const messagesReducer = (
    // eslint-disable-next-line default-param-last
    state = initialState,
    action: MessageActionTypes
): MessageState => {
    switch (action.type) {
        case UPSERT:
            return {
                ...state,
                data: uniq<Message>([...action.messages, ...state.data], ['id']),
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
};

export default messagesReducer;
