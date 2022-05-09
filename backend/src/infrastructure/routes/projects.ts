import { Request, Response, Router } from 'express';
import createProject from '../../useCases/project/createProject';
import findAllProjets from '../../useCases/project/findAllProjects';
import findOneById from '../../useCases/project/findOneById';
import findProjectsBySearch from '../../useCases/project/findProjectsBySearch';
import asyncRoute from '../../utils/asyncRoute';
import normalize from '../../utils/normalize';
import { categoryRepository, projectRepository, organizationRepository } from '../database';
import { mapProject } from '../mappers';
import { ErrorType } from './types';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        res.status(200).json((await findAllProjets()({ projectRepository })).map(mapProject));
    }),
);

router.get('/:id', asyncRoute(async (req: Request, res: Response) => {
    const { user } = req;
    const { id } = req.params;
    const project = await findOneById(id, user)({ projectRepository });
    if (project === null) {
        throw Error(ErrorType.e404);
    }

    const result = mapProject(project);
    res.status(200).json(result);
}));

router.post(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        const project = {
            budget: req.body.budget,
            categories: req.body.categories,
            description: req.body.description,
            organizations: req.body.organizations,
            participatoryBudgetYear: req.body.participatoryBudgetYear,
            startDate: req.body.startDate,
            status: req.body.status,
            title: req.body.title,
        };
        const created = await createProject(project)({ projectRepository, categoryRepository, organizationRepository });

        res.status(200).json(mapProject(created));
    }),
);

interface SearchProps {
    search?: string;
    status?: string[]; // ids only
    categories?: string[]; // ids only
}

router.post(
    '/search',
    asyncRoute(async (req: Request, res: Response) => {
        const { search, status, categories } = req.body as SearchProps;
        const normalizedSearch = search ? normalize(search) : undefined;

        const results = await findProjectsBySearch({
            search: normalizedSearch,
            status,
            categories,
        })({ projectRepository });

        res.status(200).json(results.map(mapProject));
    }),
);

export default router;
