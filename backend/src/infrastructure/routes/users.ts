import { Request, Response, Router } from 'express';
import findAllUsers from '../../useCases/users/findAllUsers';
import asyncRoute from '../../utils/asyncRoute';
import { userRepository } from '../database';
import { mapUser } from '../mappers';
import authorizeAdmin from '../middlewares/authorizeAdmin';

const router = Router();

router.get(
    '/',
    authorizeAdmin(),
    asyncRoute(async (req: Request, res: Response) => {
        const users = await findAllUsers()({ userRepository });
        res.json(users.map(mapUser));
    }),
);

export default router;
