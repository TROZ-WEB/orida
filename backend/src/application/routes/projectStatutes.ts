import { Request, Response, Router } from 'express';
import COREProjectStatusRepository from '../../core/ports/repositories/COREProjectStatusRepository';
import getAllProjectStatutes from '../../core/useCases/projectStatus/getAllProjectStatutes';
import { mapProjectStatus } from '../../infrastructure/mappers';

interface ProjectStatusRouterProps {
    projectStatusRepository: COREProjectStatusRepository,
}

const projectStatusRouter = ({
    projectStatusRepository,
}: ProjectStatusRouterProps): Router => {
    const router = Router();

    router.get(
        '/',
        async (req: Request, res: Response) => {
            const projectStatutes = await getAllProjectStatutes()({ projectStatusRepository });
            res.json(projectStatutes.map(mapProjectStatus));
        },
    );

    return router;
};

export default projectStatusRouter;
