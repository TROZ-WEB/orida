import { Request, Response, Router } from 'express';
import { categoryRepository } from '../../domain/Category';
import { projectRepository } from '../../domain/Project';
import createProject from '../../useCases/project/createProject';
import findAllProjets from '../../useCases/project/findAllProjects';
import findProjectById from '../../useCases/project/findProjectById';
import findProjectsBySearch from '../../useCases/project/findProjectsBySearch';
import asyncRoute from '../../utils/asyncRoute';
import normalize from '../../utils/normalize';
import { mapProject } from '../mappers';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        res.status(200).json((await findAllProjets()({ projectRepository })).map(mapProject));
    }),
);

router.get('/:id', asyncRoute(async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await findProjectById(id)({ projectRepository });
    const result = project === null ? null : mapProject(project);

    res.status(200).json(result);
}));

router.post(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        const created = await createProject({
            budget: req.body.budget,
            description: req.body.description,
            participatoryBudgetYear: req.body.participatoryBudgetYear,
            startDate: req.body.startDate,
            status: req.body.status,
            title: req.body.title,
            categories: req.body.categories,
        })({ projectRepository, categoryRepository });

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
