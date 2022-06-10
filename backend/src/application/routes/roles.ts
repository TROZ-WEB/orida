import { Request, Response, Router } from 'express';
import CORERoleRepository from '../../core/ports/repositories/CORERoleRepository';
import getAllRoles from '../../core/useCases/role/getAllRoles';
import { mapRole } from '../../infrastructure/mappers';

interface RoleRouterProps {
    roleRepository: CORERoleRepository,
}

const roleRouter = ({
    roleRepository,
}: RoleRouterProps): Router => {
    const router = Router();

    router.get(
        '/',
        async (req: Request, res: Response) => {
            const roles = await getAllRoles()({ roleRepository });
            res.json(roles.map(mapRole));
        },
    );

    return router;
};

export default roleRouter;
