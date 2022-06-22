import { Request, Response, Router } from 'express';
import createNotification from '../../useCases/notifications/createNotification';
import findAllNotificationsByUserId from '../../useCases/notifications/findAllNotificationsByUserId';
import updateNotificationState from '../../useCases/notifications/updateNotificationState';
import {
    userRepository,
    notificationRepository,
    notificationStateRepository,
    projectRepository,
    organizationRepository,
} from '../database';
import { mapNotificationState } from '../mappers';

const router = Router();

router.get(
    '/getByUserId',
    async (req: Request, res: Response) => {
        const userId = req.user!.id;
        const notifications = await findAllNotificationsByUserId(userId)({ userRepository });

        res.json(notifications.map(mapNotificationState));
    },
);

router.post(
    '/',
    async (req: Request, res: Response) => {
        const notification = {
            usersIds: req.body.usersIds,
            type: req.body.type,
            text: req.body.text,
            link: req.body.link,
            projectId: req.body.projectId,
            organizationId: req.body.organizationId,
        };

        const created = await createNotification(notification)({
            notificationRepository,
            notificationStateRepository,
            userRepository,
            projectRepository,
            organizationRepository,
        });

        res.status(200).json(created);
    },
);

router.patch(
    '/',
    async (req: Request, res: Response) => {
        const { notificationStateIds } = req.body;
        const updated = await updateNotificationState(notificationStateIds)({ notificationStateRepository });

        res.status(200).json(updated);
    },
);

export default router;
