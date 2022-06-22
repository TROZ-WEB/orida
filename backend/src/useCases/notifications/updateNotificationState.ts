/* eslint-disable max-len */
import { In, Repository } from 'typeorm';
import { NotificationState as NotificationStateEntity } from '../../infrastructure/database/entities/NotificationState';

interface Context {
    notificationStateRepository: Repository<NotificationStateEntity>;
}

const updateSeenNotification = (notificationStateIds: string[]) => async ({ notificationStateRepository }: Context): Promise<boolean> => {
    const notificationStates = await notificationStateRepository.findBy({ id: In(notificationStateIds) });

    notificationStates.map(async (notificationState) => {
        const notification = notificationStateRepository.create({
            ...notificationState,
            isNew: false,
        });

        await notificationStateRepository.save(notification);
    });

    return true;
};

export default updateSeenNotification;
