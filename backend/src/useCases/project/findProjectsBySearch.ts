import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { Project } from '../../domain/Project';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';

interface Context {
    projectRepository: Repository<ProjectEntity>;
}

interface FindProjectBySearchProps {
    search?: string;
    status?: string[]; // id only
    categories?: string[]; // id only
}

/* general search among projects by a string on a subselection of fields */
const findProjectsBySearch = ({ search, status, categories }: FindProjectBySearchProps) => (
    async ({ projectRepository }: Context): Promise<Project[]> => {
        const whereCondition: FindOptionsWhere<ProjectEntity> = {};

        if (search) {
            whereCondition.title = ILike(`%${search}%`);
        }

        if (categories && categories.length !== 0) {
            whereCondition.categories = {
                id: In(categories),
            };
        }

        if (status && status.length !== 0) {
            whereCondition.status = {
                id: In(status),
            };
        }

        const entities = await projectRepository.find({
            where: whereCondition,
        });

        return entities.map((entity) => entity.toDomain());
    }
);

export default findProjectsBySearch;
