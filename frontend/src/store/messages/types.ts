import { Message } from '@services/messages';
import { GlobalActionTypes } from '@store/_global/types';

export const UPSERT = 'MESSAGES_UPSERT';
export interface Upsert {
    type: typeof UPSERT;
    messages: Message[];
}

export type MessageActionTypes = GlobalActionTypes | Upsert;

export interface MessageState {
    data: Message[];
}

export const initialState: MessageState = {
    data: [],
};
