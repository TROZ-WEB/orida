import { ReduxDispatch } from '@hooks/useThunkDispatch';
import MessageService, {
    CreateProps,
    DeleteProps,
    Message,
    ModerateProps,
} from '@services/messages';

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

export const deleteMessage = (props: DeleteProps) => {
    return async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await MessageService.deleteMessage(props);
        dispatch(upsertAction([result]));
    };
};

export const toggleMessageModeration = (props: ModerateProps) => {
    return async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await MessageService.toggleMessageModeration(props);
        dispatch(upsertAction([result]));
    };
};
