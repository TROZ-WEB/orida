import CategoryDomain from '../../domain/Category';

interface CORECategoryRepository {
    getAllCategories(): Promise<CategoryDomain[]>;
}

export default CORECategoryRepository;
