import { Repository } from 'typeorm';
import { Project } from '../../domain/Project';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';

interface Context {
    projectRepository: Repository<ProjectEntity>;
}

const findOneById = (id: string) => async ({ projectRepository }: Context): Promise<Project | null> => {
    const entity = await projectRepository.findOne({
        where: { id },
        relations: {
            posts: {
                poll: {
                    responses: {
                        user: true,
                    },
                },
                thread: true,
            },
        },
    });

    return entity ? entity.toDomain() : null;
};

export default findOneById;
