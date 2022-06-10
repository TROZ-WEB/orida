/* eslint-disable max-len */
import CategoryDomain from '../../domain/Category';
import CORECategoryRepository from '../../ports/repositories/CORECategoryRepository';

interface Context {
    categoryRepository: CORECategoryRepository
}

const getAllCategories = () => async ({ categoryRepository }: Context): Promise<CategoryDomain[]> => {
    const categories = await categoryRepository.getAllCategories();

    return categories;
};

export default getAllCategories;
