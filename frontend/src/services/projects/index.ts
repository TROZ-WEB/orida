import { GET, POST } from '@utils/http';

import { CreateProps, Project } from './types';

async function getAll(): Promise<Project[]> {
    try {
        const response = await GET<Project[]>('api/projects/');

        return response;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::getAll Unhandled error');
    }
}

async function create(props: CreateProps): Promise<Project> {
    try {
        const response = await POST<Project>('api/projects/', props);

        return response;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::create Unhandled error');
    }
}

async function search(value: string): Promise<Project[]> {
    try {
        const response = await POST<Project[]>('api/projects/search', { search: value });

        return response;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::create Unhandled error');
    }
}

const ProjectService = {
    create,
    getAll,
    search,
};

export default ProjectService;
export * from './types';
