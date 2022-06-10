/* eslint-disable max-len */
import { In } from 'typeorm';
import OrganizationDomain from '../../core/domain/Organization';
import OrganizationError, { OrganizationErrorType } from '../../core/errors/OrganizationError';
import COREOrganizationRepository from '../../core/ports/repositories/COREOrganizationRepository';
import OrganizationEntity from '../database/entities/Organization.entity';

const createOrganization: COREOrganizationRepository['createOrganization'] = async ({
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
}): Promise<OrganizationDomain> => {
    const parentOrganizationsData = await OrganizationEntity.findBy({
        id: In(parentOrganizations),
    }); // Will execute the query: SELECT * FROM "categories" WHERE "id" IN <categories-ids-array>
    // (doc : https://typeorm.io/find-options)

    const organization = OrganizationEntity.create({
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

    const entity = await OrganizationEntity.save(organization);

    return entity.toDomain();
};

const getAllOrganizations: COREOrganizationRepository['getAllOrganizations'] = async (): Promise<OrganizationDomain[]> => {
    const organizations = await OrganizationEntity.find({ relations: { parentOrganizations: true, members: true } });

    return organizations.map((organization) => organization.toDomain());
};

const getOrganizationById: COREOrganizationRepository['getOrganizationById'] = async (id): Promise<OrganizationDomain | undefined> => {
    const entity = await OrganizationEntity.findOne({
        where: { id },
        relations: {
            projects: true,
            parentOrganizations: true,
            members: {
                user: true,
            },
        },
    });

    return entity ? entity.toDomain() : undefined;
};

const updateOrganization: COREOrganizationRepository['updateOrganization'] = async ({
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
}): Promise<OrganizationDomain | undefined> => {
    const parentOrganizationsData = await OrganizationEntity.findBy({
        id: In(parentOrganizations),
    }); // Will execute the query: SELECT * FROM "categories" WHERE "id" IN <categories-ids-array>
    // (doc : https://typeorm.io/find-options)

    const exist = await OrganizationEntity.findOneBy({ id });

    if (!exist) {
        throw new OrganizationError(OrganizationErrorType.NotFound);
    }

    const organization = await OrganizationEntity.create({
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

    const entity = await OrganizationEntity.save(organization);

    return entity.toDomain();
};

export default { createOrganization, getAllOrganizations, getOrganizationById, updateOrganization };
