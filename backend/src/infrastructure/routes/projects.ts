import { Request, Response, Router } from 'express';
import Budget from '../../types/Budget';
import ErrorType from '../../types/Error';
import addAnswers from '../../useCases/polls/addAnswers';
import addContributor from '../../useCases/project/addContributor';
import addProjectImages, { AddProjectImagesProps } from '../../useCases/project/addProjectImages';
import createProject, { CreateProjectProps } from '../../useCases/project/createProject';
import findAllContributors from '../../useCases/project/findAllContributors';
import findAllProjets from '../../useCases/project/findAllProjects';
import findOneById from '../../useCases/project/findOneById';
import findProjectsBySearch from '../../useCases/project/findProjectsBySearch';
import removeContributor from '../../useCases/project/removeContributor';
import updateProject, { UpdateProjectProps } from '../../useCases/project/updateProject';
import normalize from '../../utils/normalize';
import {
    categoryRepository,
    organizationRepository,
    projectContributionRepository,
    projectRepository,
    roleRepository,
    userRepository,
} from '../database';
import { mapProject, mapProjectContribution } from '../mappers';
import authorizeAdmin from '../middlewares/authorizeAdmin';
import authorizeAdminOfAllProjectOrganizations from '../middlewares/authorizeAdminOfAllProjectOrganizations';
import authorizeProjectAdmin from '../middlewares/authorizeProjectAdmin';

const router = Router();

router.get(
    '/',
    async (req: Request, res: Response) => {
        res.status(200).json((await findAllProjets()({ projectRepository })).map(mapProject));
    },
);

router.get(
    '/contributors',
    authorizeAdmin(),
    async (req: Request, res: Response) => {
        const contributors = await findAllContributors()({ projectContributionRepository });

        res.status(200).json(contributors.map(mapProjectContribution));
    },
);

router.get('/:id', async (req: Request, res: Response) => {
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
});

router.post(
    '/',
    authorizeAdminOfAllProjectOrganizations(),
    async (req: Request, res: Response) => {
        const project: CreateProjectProps = {
            auth: req.user!,
            budget: req.body.budget,
            categories: req.body.categories,
            description: req.body.description,
            organizations: req.body.organizations,
            participatoryBudgetYear: req.body.participatoryBudgetYear,
            location: req.body.location,
            images: req.body.images,
            startDate: req.body.startDate,
            statusId: req.body.statusId,
            title: req.body.title,
        };
        const created = await createProject(project)({ projectRepository, categoryRepository, organizationRepository });

        res.status(200).json(mapProject(created));
    },
);

router.post(
    '/addimages',
    async (req: Request, res: Response) => {
        const images: AddProjectImagesProps = {
            id: req.body.id,
            images: req.body.images,
        };
        const project = await addProjectImages(images)({ projectRepository });

        res.status(200).json(mapProject(project));
    },
);

router.patch(
    '/:id',
    authorizeProjectAdmin(),
    async (req: Request, res: Response) => {
        const project: UpdateProjectProps = {
            id: req.body.id,
            auth: req.user!,
            budget: req.body.budget,
            categories: req.body.categories,
            description: req.body.description,
            participatoryBudgetYear: req.body.participatoryBudgetYear,
            startDate: req.body.startDate,
            statusId: req.body.statusId,
            title: req.body.title,
            location: req.body.location,
        };
        const updated = await updateProject(project)({ projectRepository, categoryRepository });

        res.status(200).json(mapProject(updated));
    },
);

interface SearchProps {
    search?: string;
    status?: string[]; // ids only
    categories?: string[]; // ids only
    budgets?: Budget[];
}

router.post(
    '/search',
    async (req: Request, res: Response) => {
        const { search, status, categories, budgets } = req.body as SearchProps;
        const normalizedSearch = search ? normalize(search) : undefined;

        const results = await findProjectsBySearch({
            search: normalizedSearch,
            status,
            categories,
            budgets,
        })({ projectRepository });

        res.status(200).json(results.map(mapProject));
    },
);

interface AddContributorBody {
    project: string;
    user: string;
}
router.post(
    '/add-admin',
    authorizeProjectAdmin(),
    async (req: Request, res: Response) => {
        const { project, user } = req.body as AddContributorBody;
        await addContributor({ projectId: project, role: 'ADMIN', userId: user })({
            projectContributionRepository,
            projectRepository,
            roleRepository,
            userRepository,
        });

        res.status(200).json({ success: true });
    },
);

router.post(
    '/add-contributor',
    async (req: Request, res: Response) => {
        const { project, user } = req.body as AddContributorBody;
        await addContributor({ projectId: project, role: 'CONTRIBUTOR', userId: user })({
            projectContributionRepository,
            projectRepository,
            roleRepository,
            userRepository,
        });

        res.status(200).json({ success: true });
    },
);

interface RemoveContributorBody {
    project: string;
    user: string;
}
router.delete(
    '/admin',
    authorizeAdmin(),
    async (req: Request, res: Response) => {
        const { project, user } = req.body as RemoveContributorBody;
        await removeContributor({ projectId: project, userId: user })({ projectContributionRepository });

        res.status(200).json({ success: true });
    },
);

router.delete(
    '/contributor',
    async (req: Request, res: Response) => {
        const { project, user } = req.body as RemoveContributorBody;
        await removeContributor({ projectId: project, userId: user })({ projectContributionRepository });

        res.status(200).json({ success: true });
    },
);

export default router;
