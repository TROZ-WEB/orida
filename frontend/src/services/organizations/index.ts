/* eslint-disable import/no-cycle */
import { GET, PATCH, POST } from '@utils/http';

import {
    AddMemberProps,
    CreateProps,
    Organization,
    OrganizationConverter,
    RemoveMemberProps,
    UpdateProps,
} from './types';

async function getAll(): Promise<Organization[]> {
    try {
        const response = await GET<Organization[]>('/api/organizations/');

        return response.map(OrganizationConverter.fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::getAll Unhandled error');
    }
}

async function getOne(id: string): Promise<Organization | undefined> {
    try {
        const response = await GET<Organization>(`/api/organizations/${id}`);

        return OrganizationConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::getOne Unhandled error');
    }
}

async function create(props: CreateProps): Promise<Organization> {
    try {
        const response = await POST<Organization>('/api/organizations/', props);

        return OrganizationConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::create Unhandled error');
    }
}

async function update(props: UpdateProps): Promise<Organization> {
    try {
        const response = await PATCH<Organization>(`/api/organizations/${props.id}`, {
            ...props,
            organizationId: props.id, // mandatory for middleware
        });

        return OrganizationConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::update Unhandled error');
    }
}

async function addMember({ userId, organizationId, roleId }: AddMemberProps): Promise<boolean> {
    try {
        await POST<Organization>('/api/organizations/add-member', {
            user: userId,
            organization: organizationId,
            role: roleId,
        });

        return true;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::addMember Unhandled error');
    }
}

async function removeMember({ userId, organizationId }: RemoveMemberProps): Promise<boolean> {
    try {
        await POST<Organization>('/api/organizations/remove-member', {
            user: userId,
            organization: organizationId,
        });

        return true;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::removeMember Unhandled error');
    }
}

const OrganizationService = {
    addMember,
    create,
    update,
    getAll,
    getOne,
    removeMember,
};

export default OrganizationService;
export * from './types';
