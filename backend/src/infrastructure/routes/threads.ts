import { Request, Response, Router } from 'express';
import createThread from '../../useCases/threads/createThread';
import findThreadById from '../../useCases/threads/findThreadById';
import { ThreadErrorType } from '../../useCases/threads/ThreadError';
import asyncRoute from '../../utils/asyncRoute';
import { postRepository, projectRepository, threadRepository } from '../database';
import { mapThread } from '../mappers';
import authorizeAdmin from '../middlewares/authorizeAdmin';

const router = Router();

interface CreateBodyProps {
    project: string;
    subject: string;
}
router.post(
    '/',
    authorizeAdmin(), // TODO::AUTHORIZE MANAGER ONLY
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

router.get(
    '/:id',
    asyncRoute(async (req: Request, res: Response) => {
        const { id } = req.params;

        const thread = await findThreadById(id)({ threadRepository });
        if (thread === null) {
            throw Error(ThreadErrorType.NotFound);
        }

        const result = mapThread(thread);
        res.status(200).json(result);
        // const messages = [
        //     {
        //         author: 'Robert Duval',
        //         createdAt: '2022-05-19T09:00:13.513Z',
        //         content: 'Mauris sed sapien sit amet odio tempor condimentum. Etiam eu mauris a dui feugiat tempor non quis libero',
        //     },
        //     {
        //         author: 'Chloé Rajou',
        //         createdAt: '2022-05-19T09:00:22.271Z',
        //         content: 'Sed pellentesque scelerisque pellentesque. Integer rutrum arcu',
        //     },
        //     {
        //         author: 'Robert Duval',
        //         createdAt: '2022-05-19T09:00:31.465Z',
        //         content: 'Integer vestibulum eleifend purus',
        //     },
        //     {
        //         author: 'Julie Fribourg',
        //         createdAt: '2022-05-19T09:00:39.650Z',
        //         content: 'Etiam eu mauris a dui feugiat tempor non quis libero',
        //     },
        //     {
        //         author: 'Robert Duval',
        //         createdAt: '2022-05-19T09:00:48.505Z',
        //         content: 'Aliquam hendrerit ante sed molestie malesuada. Duis eu dolor vulputate, bibendum arcu ut, malesuada purus.',
        //     },
        // ];
    }),
);

export default router;
