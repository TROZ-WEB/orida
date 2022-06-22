import { GET, PATCH, POST } from '@utils/http';

import { CreateProps, NotificationState, NotificationStateConverter, UpdateProps } from './types';

async function getAll(): Promise<NotificationState[]> {
    try {
        const response = await GET<NotificationState[]>('/api/notifications/getByUserId/');

        return response.map(NotificationStateConverter.fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('NotificationService::getAll Unhandled error');
    }
}

async function create(props: CreateProps): Promise<boolean> {
    try {
        const response = await POST<boolean>('/api/notifications/', props);

        return response;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('NotificationService::create Unhandled error');
    }
}

async function update(props: UpdateProps): Promise<boolean> {
    try {
        const response = await PATCH<boolean>(`/api/notifications/`, props);

        return response;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('NotificationService::update Unhandled error');
    }
}

const NotificationService = {
    create,
    getAll,
    update,
};

export default NotificationService;
export * from './types';
