import { Between, FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { Project } from '../../domain/Project';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';
import Budget from '../../types/Budget';

interface Context {
    projectRepository: Repository<ProjectEntity>;
}

interface FindProjectBySearchProps {
    search?: string;
    status?: string[]; // id only
    categories?: string[]; // id only
    budgets?: Budget[];
}

/* general search among projects by a string on a subselection of fields */
const findProjectsBySearch = ({ search, status, categories, budgets }: FindProjectBySearchProps) => (
    async ({ projectRepository }: Context): Promise<Project[]> => {
        let orCondition: any[] = [];
        const andCondition: FindOptionsWhere<ProjectEntity> = {};

        if (search) {
            andCondition.title = ILike(`%${search}%`);
        }

        if (categories && categories.length !== 0) {
            andCondition.categories = {
                id: In(categories),
            };
        }

        if (status && status.length !== 0) {
            andCondition.status = {
                id: In(status),
            };
        }

        if (budgets && budgets.length !== 0) {
            // if several budgets are selected, build a OR condition to wrap them all
            // an AND condition with a nested OR condition need to copy every AND condition into the OR
            // SOURCE: https://stackoverflow.com/a/67485255
            orCondition = budgets.map((budget) => ({
                ...andCondition,
                budget: Between(budget.min, budget.max),
            }));
        }

        const entities = await projectRepository.find({
            where: orCondition.length !== 0
                ? orCondition
                : andCondition,
        });

        return entities.map((entity) => entity.toDomain());
    }
);

export default findProjectsBySearch;
