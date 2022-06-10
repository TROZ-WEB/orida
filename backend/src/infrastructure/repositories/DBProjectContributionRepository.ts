/* eslint-disable max-len */
import ProjectContributionDomain from '../../core/domain/ProjectContribution';
import ProjectContributionError, { ProjectContributionErrorType } from '../../core/errors/projectContributionError';
import ProjectError, { ProjectErrorType } from '../../core/errors/ProjectError';
import RoleError, { RoleErrorType } from '../../core/errors/RoleError';
import UserError, { UserErrorType } from '../../core/errors/UserError';
import COREProjectContributionRepository from '../../core/ports/repositories/COREProjectContributionRepository';
import ProjectEntity from '../database/entities/Project.entity';
import ProjectContributionEntity from '../database/entities/ProjectContribution.entity';
import RoleEntity from '../database/entities/Role.entity';
import UserEntity from '../database/entities/User.entity';

const createProjectContribution: COREProjectContributionRepository['createProjectContribution'] = async ({
    userId,
    projectId,
    roleId,
}): Promise<ProjectContributionDomain> => {
    // check for existing contribution
    const existingEntity = await ProjectContributionEntity.findOne({
        where: {
            user: { id: userId },
            project: { id: projectId },
        },
    });
    if (existingEntity) {
        throw new ProjectContributionError(ProjectContributionErrorType.AlreadyExists);
    }

    // otherwise, continue with creation
    const userData = await UserEntity.findOne({
        where: {
            id: userId,
        },
    });
    if (!userData) {
        throw new UserError(UserErrorType.NotFound);
    }

    const projectData = await ProjectEntity.findOne({
        where: {
            id: projectId,
        },
    });
    if (!projectData) {
        throw new ProjectError(ProjectErrorType.NotFound);
    }

    const roleData = roleId
        ? await RoleEntity.findOne({ where: { id: roleId } })
        : await RoleEntity.findOne({ where: { label: 'CONTRIBUTOR' } }); // by default, contributor
    if (!roleData) {
        throw new RoleError(RoleErrorType.NotFound);
    }

    const contributionEntity = ProjectContributionEntity.create({
        project: projectData,
        role: roleData,
        user: userData,
    });
    const savedEntity = await ProjectContributionEntity.save(contributionEntity);

    return savedEntity.toDomain();
};

const deleteProjectContribution: COREProjectContributionRepository['deleteProjectContribution'] = async ({
    userId,
    projectId,
}): Promise<ProjectContributionDomain> => {
    const projectContribution = await ProjectContributionEntity.findOne({
        where: {
            project: { id: projectId },
            user: { id: userId },
        },
    });

    if (!projectContribution) {
        throw new ProjectContributionError(ProjectContributionErrorType.NotFound);
    }

    await ProjectContributionEntity.remove([projectContribution]);

    return projectContribution.toDomain();
};

const getAllProjectContributions: COREProjectContributionRepository['getAllProjectContributions'] = async (): Promise<ProjectContributionDomain[]> => {
    const projectContributions = await ProjectContributionEntity.find();

    return projectContributions.map((projectContribution) => projectContribution.toDomain());
};

export default { createProjectContribution, deleteProjectContribution, getAllProjectContributions };
