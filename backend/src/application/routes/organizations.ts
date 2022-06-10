import { Request, Response, Router } from 'express';
import OrganizationError, { OrganizationErrorType } from '../../core/errors/OrganizationError';
import COREOrganizationRepository from '../../core/ports/repositories/COREOrganizationRepository';
import createOrganization from '../../core/useCases/organization/createOrganization';
import getAllOrganizations from '../../core/useCases/organization/getAllOrganizations';
import getOrganizationById from '../../core/useCases/organization/getOrganizationById';
import updateOrganization from '../../core/useCases/organization/updateOrganization';
import { mapOrganization } from '../../infrastructure/mappers';
import authorizeAdmin from '../middlewares/authorizeAdmin';
import authorizeOrganizationAdmin from '../middlewares/authorizeOrganizationAdmin';

interface OrganizationRouterProps {
    organizationRepository: COREOrganizationRepository,
}

const organizationRouter = ({
    organizationRepository,
}: OrganizationRouterProps): Router => {
    const router = Router();

    router.get(
        '/',
        async (req: Request, res: Response) => {
            res.status(200).json((await getAllOrganizations()({ organizationRepository })).map(mapOrganization));
        },
    );

    router.get('/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const organization = await getOrganizationById(id)({ organizationRepository });
        if (organization === null) {
            throw new OrganizationError(OrganizationErrorType.NotFound);
        }

        const result = mapOrganization(organization);
        res.status(200).json(result);
    });

    router.post(
        '/',
        authorizeAdmin(),
        async (req: Request, res: Response) => {
            const organization = {
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                site: req.body.site,
                email: req.body.email,
                phone: req.body.phone,
                facebook: req.body.facebook,
                twitter: req.body.twitter,
                linkedin: req.body.linkedin,
                instagram: req.body.instagram,
                projects: req.body.projects,
                parentOrganizations: req.body.parentOrganizations,
            };
            const created = await createOrganization(organization)({ organizationRepository });

            res.status(200).json(mapOrganization(created));
        },
    );

    router.patch(
        '/:id',
        authorizeOrganizationAdmin(),
        async (req: Request, res: Response) => {
            const organization = {
                id: req.body.id,
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                site: req.body.site,
                email: req.body.email,
                phone: req.body.phone,
                facebook: req.body.facebook,
                twitter: req.body.twitter,
                linkedin: req.body.linkedin,
                instagram: req.body.instagram,
                parentOrganizations: req.body.parentOrganizations,
            };
            const updated = await updateOrganization(organization)({ organizationRepository });

            res.status(200).json(mapOrganization(updated));
        },
    );

    return router;
};

export default organizationRouter;
