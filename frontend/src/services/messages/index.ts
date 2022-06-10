import { DELETE, POST } from '@utils/http';

import { CreateProps, DeleteProps, Message, MessageConverter, ModerateProps } from './types';

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
        throw Error('MessageService::delete Unhandled error');
    }
}

async function toggleMessageModeration(props: ModerateProps): Promise<Message> {
    try {
        const response = await POST<Message>('/api/messages/toggleMessageModeration', props);

        return MessageConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('MessageService::moderate Unhandled error');
    }
}

const MessageService = {
    create,
    deleteMessage,
    toggleMessageModeration,
};

export default MessageService;
export * from './types';
