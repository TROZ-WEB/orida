import { Repository, In } from 'typeorm';
import { Organization, OrganizationType } from '../../domain/Organization';
import { Project } from '../../domain/Project';
import { Organization as OrganizationEntity } from '../../infrastructure/database/entities/Organization';

interface Arg {
    name: string,
    type: OrganizationType,
    description: string,
    site: string,
    email: string,
    phone: string,
    facebook: string,
    twitter: string,
    linkedin: string,
    instagram: string,
    projects: Project[],
    parentOrganizations: Organization[],
}

interface Context {
    organizationRepository: Repository<OrganizationEntity>;
}

const createOrganization = ({
    name,
    type,
    description,
    site,
    email,
    phone,
    facebook,
    twitter,
    linkedin,
    instagram,
    parentOrganizations,
}: Arg) => async ({ organizationRepository }: Context): Promise<Organization> => {
    const parentOrganizationsData = await organizationRepository.findBy({
        id: In(parentOrganizations),
    }); // Will execute the query: SELECT * FROM "categories" WHERE "id" IN <categories-ids-array>
    // (doc : https://typeorm.io/find-options)

    const organization = organizationRepository.create({
        name,
        type,
        description,
        site,
        email,
        phone,
        facebook,
        twitter,
        linkedin,
        instagram,
        projects: [],
        parentOrganizations: parentOrganizationsData,
    });

    const entity = await organizationRepository.save(organization);

    return entity.toDomain();
};

export default createOrganization;
