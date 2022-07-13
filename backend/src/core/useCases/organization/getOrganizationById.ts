import OrganizationDomain, { organizationSnapshot } from '../../domain/Organization';
import OrganizationError, { OrganizationErrorType } from '../../errors/OrganizationError';
import COREOrganizationRepository from '../../ports/repositories/COREOrganizationRepository';

interface Context {
    organizationRepository: COREOrganizationRepository
}

const getOrganizationById = (id: string) => (
    async ({ organizationRepository }: Context): Promise<OrganizationDomain | null> => {
        const organization = await organizationRepository.getOrganizationById(id);

        if (!organization) {
            throw new OrganizationError(OrganizationErrorType.NotFound);
        }

        return organizationSnapshot(organization);
    }
);

export default getOrganizationById;
