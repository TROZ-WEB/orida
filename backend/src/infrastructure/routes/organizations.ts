import { Request, Response, Router } from 'express';
import ErrorType from '../../types/Error';
import addMember from '../../useCases/organization/addMember';
import createOrganization from '../../useCases/organization/createOrganization';
import findAllMemberships from '../../useCases/organization/findAllMemberships';
import findAllOrganizations from '../../useCases/organization/findAllOrganizations';
import findOrganizationById from '../../useCases/organization/findOrganizationById';
import removeMember from '../../useCases/organization/removeMember';
import updateOrganization from '../../useCases/organization/updateOrganization';
import { organizationMembershipRepository, organizationRepository, roleRepository, userRepository } from '../database';
import { mapOrganization, mapOrganizationMembership } from '../mappers';
import authorizeAdmin from '../middlewares/authorizeAdmin';
import authorizeOrganizationAdmin from '../middlewares/authorizeOrganizationAdmin';

const router = Router();

router.get(
    '/',
    async (req: Request, res: Response) => {
        res.status(200).json((await findAllOrganizations()({ organizationRepository })).map(mapOrganization));
    },
);

router.get('/memberships', authorizeAdmin(), async (req: Request, res: Response) => {
    const members = await findAllMemberships()({ organizationMembershipRepository });

    res.status(200).json(members.map(mapOrganizationMembership));
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const organization = await findOrganizationById(id)({ organizationRepository });
    if (organization === null) {
        throw Error(ErrorType.e404);
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

interface AddMemberBody {
    organization: string;
    role: string;
    user: string;
}

router.post(
    '/add-member',
    authorizeAdmin(),
    async (req: Request, res: Response) => {
        const { user, organization, role } = req.body as AddMemberBody;
        await addMember({
            userId: user,
            organizationId: organization,
            roleId: role,
        })({
            organizationMembershipRepository,
            organizationRepository,
            roleRepository,
            userRepository,
        });

        res.status(200).json({ success: true });
    },
);

router.post(
    '/remove-member',
    authorizeAdmin(),
    async (req: Request, res: Response) => {
        const { user, organization } = req.body;
        await removeMember({ userId: user, organizationId: organization })({ organizationMembershipRepository });

        res.status(200).json({ success: true });
    },
);

export default router;
