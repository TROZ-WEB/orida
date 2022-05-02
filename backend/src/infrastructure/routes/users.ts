import { Request, Response, Router } from 'express';
import Role from '../../domain/Role';
import findAllUsers from '../../useCases/users/findAllUsers';
import updateUserRole from '../../useCases/users/updateRole';
import asyncRoute from '../../utils/asyncRoute';
import { userRepository } from '../database';
import { mapUser } from '../mappers';
import authorize from '../middlewares/authorize';

const router = Router();

router.get(
    '/',
    authorize([Role.Admin]),
    asyncRoute(async (req: Request, res: Response) => {
        const users = await findAllUsers()({ userRepository });
        res.json(users.map(mapUser));
    }),
);

router.patch(
    '/:id',
    authorize([Role.Admin]),
    asyncRoute(async (req: Request, res: Response) => {
        const userId = req.params.id as string;
        const newRole = req.body.user.role as string;
        const user = await updateUserRole(userId, newRole)({ userRepository });
        res.json(mapUser(user));
    }),
);

export default router;
