import { Request, Response, Router } from 'express';
import Budget from '../../types/Budget';
import ErrorType from '../../types/Error';
import addAnswers from '../../useCases/polls/addAnswers';
import addContributor from '../../useCases/project/addContributor';
import createProject, { CreateProjectProps } from '../../useCases/project/createProject';
import findAllProjets from '../../useCases/project/findAllProjects';
import findOneById from '../../useCases/project/findOneById';
import findProjectsBySearch from '../../useCases/project/findProjectsBySearch';
import asyncRoute from '../../utils/asyncRoute';
import normalize from '../../utils/normalize';
import {
    categoryRepository,
    organizationRepository,
    projectContributionRepository,
    projectRepository,
    roleRepository,
    userRepository,
} from '../database';
import { mapProject } from '../mappers';
import authorizeAdmin from '../middlewares/authorizeAdmin';
import authorizeAdminOfAllProjectOrganizations from '../middlewares/authorizeAdminOfAllProjectOrganizations';

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
    const project = await findOneById(id)({ projectRepository });

    if (project === null) {
        throw Error(ErrorType.e404);
    }

    if (user) {
        project.posts = addAnswers({ posts: project.posts, user });
    }

    const result = mapProject(project);
    res.status(200).json(result);
}));

router.post(
    '/',
    authorizeAdminOfAllProjectOrganizations(),
    asyncRoute(async (req: Request, res: Response) => {
        const project: CreateProjectProps = {
            auth: req.user!,
            budget: req.body.budget,
            categories: req.body.categories,
            description: req.body.description,
            organizations: req.body.organizations,
            participatoryBudgetYear: req.body.participatoryBudgetYear,
            location: req.body.location,
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
    budgets?: Budget[];
}

router.post(
    '/search',
    asyncRoute(async (req: Request, res: Response) => {
        const { search, status, categories, budgets } = req.body as SearchProps;
        const normalizedSearch = search ? normalize(search) : undefined;

        const results = await findProjectsBySearch({
            search: normalizedSearch,
            status,
            categories,
            budgets,
        })({ projectRepository });

        res.status(200).json(results.map(mapProject));
    }),
);

interface AddContributorBody {
    project: string;
    role: string;
    user: string;
}
router.post(
    '/add-contributor',
    authorizeAdmin(),
    asyncRoute(async (req: Request, res: Response) => {
        const { project, role, user } = req.body as AddContributorBody;
        await addContributor({ projectId: project, roleId: role, userId: user })({
            projectContributionRepository,
            projectRepository,
            roleRepository,
            userRepository,
        });

        res.status(200).json({ success: true });
    }),
);

export default router;
