import { GET } from '@utils/http';

import { Category, CategoryConverter } from './types';

async function getAll(): Promise<Category[]> {
    try {
        const response = await GET<Category[]>('/api/categories/');

        return response.map(CategoryConverter.fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('CategoriesService::getAll Unhandled error');
    }
}

const CategoriesService = {
    getAll,
};

export default CategoriesService;
export * from './types';
