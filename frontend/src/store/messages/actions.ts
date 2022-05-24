import { ReduxDispatch } from '@hooks/useThunkDispatch';
import MessageService, { CreateProps, Message } from '@services/messages';

import { MessageActionTypes, UPSERT } from './types';

export const upsertAction = (messages: Message[]): MessageActionTypes => ({
    type: UPSERT,
    messages,
});

export const create = (props: CreateProps) => {
    return async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await MessageService.create(props);
        dispatch(upsertAction([result]));
    };
};
