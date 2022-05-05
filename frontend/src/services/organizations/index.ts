import { GET, POST } from '@utils/http';

import { CreateProps, fromApi, Organization } from './types';

async function getAll(): Promise<Organization[]> {
    try {
        const response = await GET<Organization[]>('/api/organizations/');

        return response.map(fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::getAll Unhandled error');
    }
}

async function getOne(id: string): Promise<Organization | undefined> {
    try {
        const response = await GET<Organization>(`/api/organizations/${id}`);

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::getOne Unhandled error');
    }
}

async function create(props: CreateProps): Promise<Organization> {
    try {
        const response = await POST<Organization>('/api/organizations/', props);

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::create Unhandled error');
    }
}

const OrganizationService = {
    create,
    getAll,
    getOne,
};

export default OrganizationService;
export * from './types';
