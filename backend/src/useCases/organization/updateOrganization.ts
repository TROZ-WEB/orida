import { Repository, In } from 'typeorm';
import { Organization, OrganizationType } from '../../domain/Organization';
import { Organization as OrganizationEntity } from '../../infrastructure/database/entities/Organization';
import ErrorType from '../../types/Error';

interface Arg {
    id:string;
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
    parentOrganizations: Organization[],
}

interface Context {
    organizationRepository: Repository<OrganizationEntity>;
}

const updateOrganization = ({
    id,
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

    const exist = await organizationRepository.findOneBy({ id });

    if (!exist) {
        throw Error(ErrorType.e404);
    }

    const organization = await organizationRepository.create({
        id,
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
        parentOrganizations: parentOrganizationsData,
    });

    const entity = await organizationRepository.save(organization);

    return entity.toDomain();
};

export default updateOrganization;
