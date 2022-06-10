import { DELETE, POST } from '@utils/http';

import { CreateProps, DeleteProps, Message, MessageConverter } from './types';

async function create(props: CreateProps): Promise<Message> {
    try {
        const response = await POST<Message>('/api/messages/', props);

        return MessageConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('MessageService::create Unhandled error');
    }
}

async function deleteMessage(props: DeleteProps): Promise<Message> {
    try {
        const response = await DELETE<Message>(`/api/messages/${props.id}`, props);

        return MessageConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('MessageService::create Unhandled error');
    }
}

const MessageService = {
    create,
    deleteMessage,
};

export default MessageService;
export * from './types';
