import { Request, Response, Router } from 'express';
import AuthError, { AuthErrorType } from '../../core/errors/AuthError';
import UserError, { UserErrorType } from '../../core/errors/UserError';
import COREUserRepository from '../../core/ports/repositories/COREUserRepository';
import registerUser from '../../core/useCases/auth/registerUser';
import getAllUsers from '../../core/useCases/user/getAllUsers';
import getUserById from '../../core/useCases/user/getUserById';
import { mapUser } from '../../infrastructure/mappers';
import auth from '../auth';

interface UserRouterProps {
    userRepository: COREUserRepository,
}

const userRouter = ({
    userRepository,
}: UserRouterProps): Router => {
    const router = Router();

    router.get(
        '/',
        async (req: Request, res: Response) => {
            const users = await getAllUsers()({ userRepository });
            res.json(users.map(mapUser));
        },
    );

    router.get('/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await getUserById(id)({ userRepository });

        if (!user) {
            throw new UserError(UserErrorType.NotFound);
        }

        const result = mapUser(user);
        res.status(200).json(result);
    });

    router.post('/login', auth.authenticate('local'), (req: Request, res: Response) => {
        res.json(mapUser(req.user!));
    });

    router.post('/register', async (req: Request, res: Response) => {
        try {
            const user = {
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
            };
            const newUser = await registerUser(user)({ userRepository });
            res.json(mapUser(newUser));
        } catch (e: any) {
            console.error(e);

            if (e.message === AuthErrorType.RegisterEmailAlreadyInUse) {
                res.status(409).json({
                    error: e.message,
                });
            }

            throw new AuthError(AuthErrorType.RegisterUnknownError);
        }
    });

    router.post('/logout', (req: Request, res: Response) => {
        req.logout();
        res.status(200).json({ success: true });
    });

    router.get('/getAuth', (req: Request, res: Response) => {
        if (req.user) {
            res.json(mapUser(req.user));
        } else {
            res.status(404).json({});
        }
    });

    return router;
};

export default userRouter;
