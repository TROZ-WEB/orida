import { POST } from '@utils/http';

import { CreateProps, Message, MessageConverter } from './types';

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

const MessageService = {
    create,
};

export default MessageService;
export * from './types';
