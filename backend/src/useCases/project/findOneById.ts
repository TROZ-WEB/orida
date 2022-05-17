import { Repository } from 'typeorm';
import { Project } from '../../domain/Project';
import { User } from '../../domain/User';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';

interface Context {
    projectRepository: Repository<ProjectEntity>;
}

const findOneById = (id: string, user?: User) => async ({ projectRepository }: Context): Promise<Project | null> => {
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

    if (user) {
        entity?.posts.forEach((post) => post.poll?.responses?.filter((response) => response.user.id === user.id));
    }

    return entity ? entity.toDomain() : null;
};

export default findOneById;
