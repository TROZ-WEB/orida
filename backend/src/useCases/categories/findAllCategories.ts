/* eslint-disable max-len */
import { Repository } from 'typeorm';
import { Category } from '../../domain/Category';

interface Context {
    categoryRepository: Repository<Category>
}

const findAllCategories = () => async ({ categoryRepository }: Context): Promise<Category[]> => categoryRepository.find();

export default findAllCategories;
