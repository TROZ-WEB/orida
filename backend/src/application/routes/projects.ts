import { Request, Response, Router } from 'express';
import ProjectError, { ProjectErrorType } from '../../core/errors/ProjectError';
import COREProjectRepository from '../../core/ports/repositories/COREProjectRepository';
import { Budget } from '../../core/domain/Project';
import createProject from '../../core/useCases/project/createProject';
import createProjectImages from '../../core/useCases/project/createProjectImages';
import getAllProjects from '../../core/useCases/project/getAllProjects';
import getProjectById from '../../core/useCases/project/getProjectById';
import getProjectsBySearch from '../../core/useCases/project/getProjectsBySearch';
import updateProject from '../../core/useCases/project/updateProject';
import { mapProject } from '../../infrastructure/mappers';
import normalize from '../../utils/normalize';
import authorizeAdminOfAllProjectOrganizations from '../middlewares/authorizeAdminOfAllProjectOrganizations';
import authorizeProjectAdmin from '../middlewares/authorizeProjectAdmin';

interface ProjectRouterProps {
    projectRepository: COREProjectRepository,
}

const projectRouter = ({
    projectRepository,
}: ProjectRouterProps): Router => {
    const router = Router();

    router.get(
        '/',
        async (req: Request, res: Response) => {
            res.status(200).json((await getAllProjects()({ projectRepository })).map(mapProject));
        },
    );

    router.get('/:id', async (req: Request, res: Response) => {
        const { user } = req;
        const { id } = req.params;
        const project = await getProjectById(id)({ projectRepository });

        if (project === null) {
            throw new ProjectError(ProjectErrorType.NotFound);
        }

        // if (user) {
        //     project.posts = addAnswers({ posts: project.posts, user });
        // }

        const result = mapProject(project);
        res.status(200).json(result);
    });

    router.post(
        '/',
        authorizeAdminOfAllProjectOrganizations(),
        async (req: Request, res: Response) => {
            const project = {
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
            const created = await createProject(project)({ projectRepository });

            res.status(200).json(mapProject(created));
        },
    );

    router.post(
        '/addimages',
        async (req: Request, res: Response) => {
            const images = {
                id: req.body.id,
                images: req.body.images,
            };
            const project = await createProjectImages(images)({ projectRepository });

            res.status(200).json(mapProject(project));
        },
    );

    router.patch(
        '/:id',
        authorizeProjectAdmin(),
        async (req: Request, res: Response) => {
            const project = {
                id: req.body.id,
                budget: req.body.budget,
                categories: req.body.categories,
                description: req.body.description,
                participatoryBudgetYear: req.body.participatoryBudgetYear,
                startDate: req.body.startDate,
                statusId: req.body.statusId,
                title: req.body.title,
                location: req.body.location,
            };
            const updated = await updateProject(project)({ projectRepository });

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

        const results = await getProjectsBySearch({
            search: normalizedSearch,
            status,
            categories,
            budgets,
        })({ projectRepository });

        res.status(200).json(results.map(mapProject));
    },
);

return router;
};

export default projectRouter;
