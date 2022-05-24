import { Message, MessageConverter } from '@services/messages';

export interface Thread {
    id: string;
    subject: string;
    createdAt: Date;
    messages: Message[];
}

export const ThreadConverter = {
    fromApi(data: any): Thread {
        return {
            id: data.id,
            subject: data.subject,
            createdAt: new Date(data.createdAt),
            messages: data.messages?.map(MessageConverter.fromApi) ?? [],
        };
    },
};
