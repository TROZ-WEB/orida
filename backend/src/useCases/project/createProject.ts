/* eslint-disable max-len */
import { Repository, In } from 'typeorm';
import { Category } from '../../domain/Category';
import { Project, ProjectStatus } from '../../domain/Project';

interface Arg {
    title: string;
    description?: string;
    budget?: Number;
    participatoryBudgetYear?: Number;
    startDate?: Date;
    status?: ProjectStatus;
    categories: Category[]
}

interface Context {
    projectRepository: Repository<Project>;
    categoryRepository: Repository<Category>;
}

const createProject = ({
    budget,
    description,
    participatoryBudgetYear,
    status,
    startDate,
    title,
    categories,
}: Arg) => async ({ projectRepository, categoryRepository }: Context): Promise<Project> => {
    const categoriesData = await categoryRepository.findBy({
        id: In(categories),
    }); // Will execute the query: SELECT * FROM "categories" WHERE "id" IN <categories-ids-array> (doc : https://typeorm.io/find-options)

    const project = projectRepository.create({
        budget,
        description,
        participatoryBudgetYear,
        status: status || ProjectStatus.Design,
        startDate,
        title,
        categories: categoriesData,
    });

    return projectRepository.save(project);
};

export default createProject;
