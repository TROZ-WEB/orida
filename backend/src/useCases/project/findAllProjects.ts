/* eslint-disable max-len */
import { Repository } from 'typeorm';
import { Project } from '../../domain/Project';

interface Context {
    projectRepository: Repository<Project>
}

const findAllProjets = () => async ({ projectRepository }: Context): Promise<Project[]> => projectRepository.find({ relations: { categories: true } });

export default findAllProjets;
