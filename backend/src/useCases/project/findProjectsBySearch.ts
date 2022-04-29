import { ILike, Repository } from 'typeorm';
import { Project } from '../../domain/Project';

interface Context {
    projectRepository: Repository<Project>;
}

/* general search among projects by a string on a subselection of fields */
const findProjectBySearch = (search: string) => async ({ projectRepository }: Context): Promise<Project[]> => (
    projectRepository.find({
        where: { title: ILike(`%${search}%`) }, // ILike : case insensitive string query
    })
);

export default findProjectBySearch;
