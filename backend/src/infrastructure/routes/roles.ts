import { Request, Response, Router } from 'express';
import findAllRoles from '../../useCases/roles/findAllRoles';
import { roleRepository } from '../database';
import { mapRole } from '../mappers';

const router = Router();

router.get(
    '/',
    async (req: Request, res: Response) => {
        const roles = await findAllRoles()({ roleRepository });
        res.status(200).json(roles.map(mapRole));
    },
);

export default router;
