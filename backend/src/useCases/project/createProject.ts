import { Repository, In } from 'typeorm';
import { Category } from '../../domain/Category';
import { Project } from '../../domain/Project';
import { projectStatusRepository } from '../../infrastructure/database';
import { Category as CategoryEntity } from '../../infrastructure/database/entities/Category';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';

interface Arg {
    budget?: Number;
    categories: Category[];
    description?: string;
    participatoryBudgetYear?: Number;
    startDate?: Date;
    status: string;
    title: string;
}

interface Context {
    projectRepository: Repository<ProjectEntity>;
    categoryRepository: Repository<CategoryEntity>;
}

const createProject = ({
    budget,
    categories,
    description,
    participatoryBudgetYear,
    startDate,
    status,
    title,
}: Arg) => async ({ projectRepository, categoryRepository }: Context): Promise<Project> => {
    const categoriesData = await categoryRepository.findBy({
        id: In(categories),
    }); // Will execute the query: SELECT * FROM "categories" WHERE "id" IN <categories-ids-array>
    // (doc : https://typeorm.io/find-options)

    const statusData = await projectStatusRepository.findOne({
        where: { id: status },
    });

    if (!statusData) {
        throw Error('Missing StatusData');
    }

    const project = projectRepository.create({
        budget,
        description,
        participatoryBudgetYear,
        startDate,
        title,
        categories: categoriesData,
        status: statusData,
    });

    const entity = await projectRepository.save(project);

    return entity.toDomain();
};

export default createProject;
