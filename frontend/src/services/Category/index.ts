import { GET, POST } from '@utils/http';

import { Category, CreateProps, fromApi } from './types';

async function getAll(): Promise<Category[]> {
    try {
        const response = await GET<Category[]>('/api/categories/');

        return response.map(fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('CategoryService::getAll Unhandled error');
    }
}

async function getOne(id: string): Promise<Category | undefined> {
    try {
        const response = await GET<Category>(`/api/categories/${id}`);

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('CategoryService::getOne Unhandled error');
    }
}

async function create(props: CreateProps): Promise<Category> {
    try {
        const response = await POST<Category>('/api/categories/', props);

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('CategoryService::create Unhandled error');
    }
}

const CategoryService = {
    create,
    getAll,
    getOne,
};

export default CategoryService;
export * from './types';
