/* eslint-disable max-len */
import { Repository } from 'typeorm';
import { Category } from '../../domain/Category';
import { Category as CategoryEntity } from '../../infrastructure/database/entities/Category';

interface Context {
    categoryRepository: Repository<CategoryEntity>
}

const findAllCategories = () => async ({ categoryRepository }: Context): Promise<Category[]> => {
    const entities = await categoryRepository.find();

    return entities.map((entity) => entity.toDomain());
};

export default findAllCategories;
