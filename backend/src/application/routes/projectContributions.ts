/* eslint-disable max-len */
import { Request, Response, Router } from 'express';
import COREProjectContributionRepository from '../../core/ports/repositories/COREProjectContributionRepository';
import createProjectContribution from '../../core/useCases/projectContribution/createProjectContribution';
import getAllProjectContributions from '../../core/useCases/projectContribution/getAllProjectContributions';
import { mapProjectContribution } from '../../infrastructure/mappers';

interface ProjectContributionRouterProps {
    projectContributionRepository: COREProjectContributionRepository,
}

const projectContributionRouter = ({
    projectContributionRepository,
}: ProjectContributionRouterProps): Router => {
    const router = Router();

    interface createProjectContributionProps {
        projectId: string;
        userId: string;
        roleId: string;
    }

    router.post(
        '/',
        async (req: Request, res: Response) => {
            const { projectId, userId, roleId } = req.body as createProjectContributionProps;
            const projectContribution = await createProjectContribution({ projectId, userId, roleId })({ projectContributionRepository });

            res.status(200).json(mapProjectContribution(projectContribution));
        },
    );

    router.get(
        '/',
        async (req: Request, res: Response) => {
            const users = await getAllProjectContributions()({ projectContributionRepository });
            res.json(users.map(mapProjectContribution));
        },
    );

    return router;
};

export default projectContributionRouter;
