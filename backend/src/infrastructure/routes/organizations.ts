import { Request, Response, Router } from 'express';
import Role from '../../domain/Role';
import ErrorType from '../../types/Error';
import addMember from '../../useCases/organization/addMember';
import createOrganization from '../../useCases/organization/createOrganization';
import findAllOrganizations from '../../useCases/organization/findAllOrganizations';
import findOrganizationById from '../../useCases/organization/findOrganizationById';
import updateOrganization from '../../useCases/organization/updateOrganization';
import asyncRoute from '../../utils/asyncRoute';
import { organizationMembershipRepository, organizationRepository, userRepository } from '../database';
import { mapOrganization } from '../mappers';
import authorize from '../middlewares/authorize';

const router = Router();

router.get(
    '/',
    asyncRoute(async (req: Request, res: Response) => {
        res.status(200).json((await findAllOrganizations()({ organizationRepository })).map(mapOrganization));
    }),
);

router.get('/:id', asyncRoute(async (req: Request, res: Response) => {
    const { id } = req.params;
    const organization = await findOrganizationById(id)({ organizationRepository });
    if (organization === null) {
        throw Error(ErrorType.e404);
    }

    const result = mapOrganization(organization);
    res.status(200).json(result);
}));

router.post(
    '/',
    authorize([Role.Admin]),
    asyncRoute(async (req: Request, res: Response) => {
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
    }),
);

router.post(
    '/update',
    authorize([Role.Admin]),
    asyncRoute(async (req: Request, res: Response) => {
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
    }),
);

router.post(
    '/add-member',
    authorize([Role.Admin]),
    asyncRoute(async (req: Request, res: Response) => {
        const { user, organization } = req.body;
        await addMember({
            userId: user,
            organizationId: organization,
        })({
            organizationRepository,
            userRepository,
            organizationMembershipRepository,
        });

        res.status(200).json({ success: true });
    }),
);

export default router;
