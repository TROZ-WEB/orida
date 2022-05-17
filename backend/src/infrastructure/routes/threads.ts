import { Request, Response, Router } from 'express';
import Role from '../../domain/Role';
import createThread from '../../useCases/threads/createThread';
import asyncRoute from '../../utils/asyncRoute';
import { postRepository, projectRepository, threadRepository } from '../database';
import { mapThread } from '../mappers';
import authorize from '../middlewares/authorize';

const router = Router();

interface CreateBodyProps {
    project: string;
    subject: string;
}
router.post(
    '/',
    authorize([Role.Manager]),
    asyncRoute(async (req: Request, res: Response) => {
        const { project, subject } = req.body as CreateBodyProps;
        const thread = await createThread({ project, subject })({
            postRepository,
            projectRepository,
            threadRepository,
        });

        res.status(200).json(mapThread(thread));
    }),
);

export default router;
