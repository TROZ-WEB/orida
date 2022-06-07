import { Request, Response, Router } from 'express';
import createThread from '../../useCases/threads/createThread';
import findThreadById from '../../useCases/threads/findThreadById';
import { ThreadErrorType } from '../../useCases/threads/ThreadError';
import { postRepository, projectRepository, threadRepository } from '../database';
import { mapThread } from '../mappers';
import authorizeProjectAdmin from '../middlewares/authorizeProjectAdmin';

const router = Router();

interface CreateBodyProps {
    project: string;
    subject: string;
}
router.post(
    '/',
    authorizeProjectAdmin(),
    async (req: Request, res: Response) => {
        const { project, subject } = req.body as CreateBodyProps;
        const thread = await createThread({ project, subject })({
            postRepository,
            projectRepository,
            threadRepository,
        });

        res.status(200).json(mapThread(thread));
    },
);

router.get(
    '/:id',
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const thread = await findThreadById(id)({ threadRepository });
        if (thread === null) {
            throw Error(ThreadErrorType.NotFound);
        }
        const result = mapThread(thread);
        res.status(200).json(result);
    },
);

export default router;
