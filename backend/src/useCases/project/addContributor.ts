import { Repository } from 'typeorm';
import { ProjectContribution } from '../../domain/ProjectContribution';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';
import {
    ProjectContribution as ProjectContributionEntity,
} from '../../infrastructure/database/entities/ProjectContribution';
import { Role as RoleEntity } from '../../infrastructure/database/entities/Role';
import { User as UserEntity } from '../../infrastructure/database/entities/User';
import RoleError, { RoleErrorType } from '../roles/roleError';
import UserError, { UserErrorType } from '../users/UserError';
import ProjectContributionError, { ProjectContributionErrorType } from './projectContributionError';
import ProjectError, { ProjectErrorType } from './projectError';

interface Arg {
    userId: string;
    projectId: string;
    role: string;
}

interface Context {
    projectContributionRepository: Repository<ProjectContributionEntity>;
    projectRepository: Repository<ProjectEntity>;
    roleRepository: Repository<RoleEntity>;
    userRepository: Repository<UserEntity>;
}

const addContributor = ({
    userId,
    projectId,
    role,
}: Arg) => async ({
    projectContributionRepository,
    projectRepository,
    roleRepository,
    userRepository,
}: Context): Promise<ProjectContribution> => {
    // check for existing contribution
    const existingEntity = await projectContributionRepository.findOne({
        where: {
            user: { id: userId },
            project: { id: projectId },
        },
    });
    if (existingEntity) {
        throw new ProjectContributionError(ProjectContributionErrorType.AlreadyExists);
    }

    // otherwise, continue with creation
    const userData = await userRepository.findOne({
        where: {
            id: userId,
        },
    });
    if (!userData) {
        throw new UserError(UserErrorType.NotFound);
    }

    const projectData = await projectRepository.findOne({
        where: {
            id: projectId,
        },
    });
    if (!projectData) {
        throw new ProjectError(ProjectErrorType.NotFound);
    }

    const roleData = await roleRepository.findOne({ where: { label: role } });

    if (!roleData) {
        throw new RoleError(RoleErrorType.NotFound);
    }

    const contributionEntity = projectContributionRepository.create({
        project: projectData,
        role: roleData,
        user: userData,
    });
    const savedEntity = await projectContributionRepository.save(contributionEntity);

    return savedEntity.toDomain();
};

export default addContributor;
