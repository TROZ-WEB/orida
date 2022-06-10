import { Request, Response, Router } from 'express';
import createMessage from '../../useCases/messages/createMessage';
import deleteMessage from '../../useCases/messages/deleteMessage';
import { userRepository, threadRepository, messageRepository } from '../database';
import { mapThread } from '../mappers';

const router = Router();

interface CreateBodyProps {
    threadId: string;
    authorId: string;
    content: string;
}

router.post(
    '/',
    async (req: Request, res: Response) => {
        const { threadId, authorId, content } = req.body as CreateBodyProps;
        const thread = await createMessage({ threadId, authorId, content })({
            userRepository,
            threadRepository,
            messageRepository,
        });

        res.status(200).json(mapThread(thread));
    },
);

router.delete(
    '/:id',
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const thread = await deleteMessage({ id })({
            threadRepository,
            messageRepository,
        });

        res.status(200).json(mapThread(thread));
    },
);

export default router;
