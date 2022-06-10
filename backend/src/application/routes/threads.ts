import { Request, Response, Router } from 'express';
import ThreadError, { ThreadErrorType } from '../../core/errors/ThreadError';
import COREThreadRepository from '../../core/ports/repositories/COREThreadRepository';
import createThread from '../../core/useCases/thread/createThread';
import createThreadMessage from '../../core/useCases/thread/createThreadMessage';
import getThreadById from '../../core/useCases/thread/getThreadById';
import { mapThread } from '../../infrastructure/mappers';
import authorizeProjectAdmin from '../middlewares/authorizeProjectAdmin';

interface ThreadRouterProps {
    threadRepository: COREThreadRepository,
}

const threadRouter = ({
    threadRepository,
}: ThreadRouterProps): Router => {
    const router = Router();

    interface CreateBodyProps {
        projectId: string;
        subject: string;
    }
    router.post(
        '/',
        authorizeProjectAdmin(),
        async (req: Request, res: Response) => {
            const { projectId, subject } = req.body as CreateBodyProps;
            const thread = await createThread({ projectId, subject })({ threadRepository });

            res.status(200).json(mapThread(thread));
        },
    );

    router.get('/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const thread = await getThreadById(id)({ threadRepository });

        if (!thread) {
            throw new ThreadError(ThreadErrorType.NotFound);
        }

        const result = mapThread(thread);
        res.status(200).json(result);
    });

    interface createThreadMessageProps {
        threadId: string;
        authorId: string;
        content: string;
    }
    router.post(
        '/message',
        async (req: Request, res: Response) => {
            const { threadId, authorId, content } = req.body as createThreadMessageProps;
            const thread = await createThreadMessage({ threadId, authorId, content })({ threadRepository });

            res.status(200).json(mapThread(thread));
        },
    );

    return router;
};

export default threadRouter;
