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
import ProjectError, { ProjectErrorType } from './projectError';

interface Arg {
    userId: string;
    projectId: string;
    roleId?: string;
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
    roleId,
}: Arg) => async ({
    projectContributionRepository,
    projectRepository,
    roleRepository,
    userRepository,
}: Context): Promise<ProjectContribution> => {
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

    const roleData = roleId
        ? await roleRepository.findOne({ where: { id: roleId } })
        : await roleRepository.findOne({ where: { label: 'CONTRIBUTOR' } }); // by default, contributor
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
