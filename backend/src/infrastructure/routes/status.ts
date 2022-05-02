/* eslint-disable max-len */
import { Request, Response, Router } from 'express';
import getAllStatus from '../../useCases/status/getAllStatuses';
import asyncRoute from '../../utils/asyncRoute';
import { projectStatusRepository } from '../database';
import { mapProjectStatus } from '../mappers';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        const statuses = await getAllStatus()({ projectStatusRepository });
        res.status(200).json(statuses.map(mapProjectStatus));
    }),
);

export default router;
