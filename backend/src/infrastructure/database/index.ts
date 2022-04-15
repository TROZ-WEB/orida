import { getRepository } from 'typeorm';
import { Project } from '../../domain/Project';
import { User } from '../../domain/User';

const projectRepository = getRepository<Project>(Project);
const userRepository = getRepository<User>(User);

export {
    projectRepository,
    userRepository,
};
