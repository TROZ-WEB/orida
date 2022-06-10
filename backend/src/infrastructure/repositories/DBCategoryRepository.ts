import CategoryDomain from '../../core/domain/Category';
import CORECategoryRepository from '../../core/ports/repositories/CORECategoryRepository';
import CategoryEntity from '../database/entities/Category.entity';

const getAllCategories: CORECategoryRepository['getAllCategories'] = async (): Promise<CategoryDomain[]> => {
    const categories = await CategoryEntity.find();

    return categories.map((category) => category.toDomain());
};

export default { getAllCategories };
