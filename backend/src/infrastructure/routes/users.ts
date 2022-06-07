import { Request, Response, Router } from 'express';
import ErrorType from '../../types/Error';
import findAllUsers from '../../useCases/users/findAllUsers';
import findUserById from '../../useCases/users/findUserById';
import { userRepository } from '../database';
import { mapUser } from '../mappers';

const router = Router();

router.get(
    '/',
    async (req: Request, res: Response) => {
        const users = await findAllUsers()({ userRepository });
        res.json(users.map(mapUser));
    },
);

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await findUserById(id)({ userRepository });
    if (user === null) {
        throw Error(ErrorType.e404);
    }

    const result = mapUser(user);
    res.status(200).json(result);
});

export default router;
