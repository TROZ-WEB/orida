import { Request, Response, Router } from 'express';
import asyncRoute from '../../utils/asyncRoute';
import { mapEnvironment } from '../mappers';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        res.status(200).json(mapEnvironment(process.env));
    }),
);

export default router;
