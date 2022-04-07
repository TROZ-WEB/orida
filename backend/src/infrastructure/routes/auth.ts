import { Request, Response, Router } from 'express';
import registerUser from '../../useCases/auth/registerUser';
import auth from '../auth';
import { userRepository } from '../database';
import { mapUser } from '../mappers';

const router = Router();

router.post('/login', auth.authenticate('local'), (req: Request, res: Response) => {
    res.json(mapUser(req.user!));
});

router.post('/register', async (req: Request, res: Response) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
            type: req.body.type,
        };
        const newUser = await registerUser(user)({ userRepository });
        res.json(mapUser(newUser));
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/logout', (req: Request, res: Response) => {
    req.logout();
    res.status(200).json({ success: true });
});

router.get('/me', (req: Request, res: Response) => {
    if (req.user) {
        res.json(mapUser(req.user));
    } else {
        res.status(404).json({});
    }
});

export default router;
