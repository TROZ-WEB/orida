import { Repository } from 'typeorm';
import { Project } from '../../domain/Project';

interface Context {
    projectRepository: Repository<Project>;
}

const findProjectById = (id: string) => async ({ projectRepository }: Context): Promise<Project | null> => (
    projectRepository.findOne({ where: { id } })
);

export default findProjectById;
