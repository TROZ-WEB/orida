import { Request, Response, Router } from 'express';
import createProject from '../../useCases/project/createProject';
import findAllProjets from '../../useCases/project/findAllProjects';
import findProjectsBySearch from '../../useCases/project/findProjectsBySearch';
import asyncRoute from '../../utils/asyncRoute';
import normalize from '../../utils/normalize';
import { projectRepository } from '../database';
import { mapProject } from '../mappers';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        res.status(200).json((await findAllProjets()({ projectRepository })).map(mapProject));
    }),
);

router.post(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        const created = await createProject({
            title: req.body.title,
        })({ projectRepository });

        res.status(200).json(mapProject(created));
    }),
);

router.post(
    '/search',
    asyncRoute(async (req: Request, res: Response) => {
        const { search } = req.body;
        const normalizedSearch = normalize(search);
        const results = await findProjectsBySearch(normalizedSearch)({ projectRepository });

        res.status(200).json(results.map(mapProject));
    }),
);

export default router;
