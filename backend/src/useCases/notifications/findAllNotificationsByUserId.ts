/* eslint-disable max-len */
import { Repository } from 'typeorm';
import { NotificationState } from '../../domain/NotificationState';
import { User as UserEntity } from '../../infrastructure/database/entities/User';
import UserError, { UserErrorType } from '../users/UserError';

interface Context {
    userRepository: Repository<UserEntity>;
}

const findAllNotificationsByUserId = (userId: string) => async ({ userRepository }: Context): Promise<NotificationState[]> => {
    const user = await userRepository.findOne({
        select: {
            notifications: true,
        },
        where: { id: userId },
        order: {
            createdAt: 'DESC',
        },
        relations: {
            notifications: {
                notification: {
                    project: {
                        images: true,
                    },
                },
            },
        },
    });

    if (!user) {
        throw new UserError(UserErrorType.NotFound);
    }

    return user.notifications.map((notificationState) => notificationState.toDomain());
};

export default findAllNotificationsByUserId;
