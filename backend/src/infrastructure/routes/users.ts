import { Request, Response, Router } from 'express';
import { userRepository } from '../../domain/User';
import asyncRoute from '../../utils/asyncRoute';
import { mapUser } from '../mappers';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        res.json((await userRepository.find()).map(mapUser));
    }),
);

export default router;
