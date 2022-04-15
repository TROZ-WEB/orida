import { Request, Response, Router } from 'express';
import createProject from '../../useCases/project/createProject';
import findProjects from '../../useCases/project/findProjects';
import asyncRoute from '../../utils/asyncRoute';
import { projectRepository } from '../database';
import { mapProject } from '../mappers';

const router = Router();

router.get('/', asyncRoute(async (req: Request, res: Response) => {
    res.json((await findProjects()({ projectRepository })).map(mapProject));
}));

router.post('/', asyncRoute(async (req: Request, res: Response) => {
    const created = await createProject({
        title: req.body.title,
    })({ projectRepository });

    res.json(mapProject(created));
}));

export default router;
