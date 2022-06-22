/* eslint-disable max-len */
import { In, Repository } from 'typeorm';
import { NotificationType } from '../../domain/Notification';
import { Notification as NotificationEntity } from '../../infrastructure/database/entities/Notification';
import { NotificationState as NotificationStateEntity } from '../../infrastructure/database/entities/NotificationState';
import { Organization as OrganizationEntity } from '../../infrastructure/database/entities/Organization';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';
import { User as UserEntity } from '../../infrastructure/database/entities/User';
import OrganizationError, { OrganizationErrorType } from '../organization/organizationError';
import ProjectError, { ProjectErrorType } from '../project/projectError';
import UserError, { UserErrorType } from '../users/UserError';

export interface CreateNotificationProps {
    usersIds: string[],
    type: NotificationType,
    text: string,
    link: string,
    projectId: string,
    organizationId: string,
}

interface Context {
    notificationRepository: Repository<NotificationEntity>;
    notificationStateRepository: Repository<NotificationStateEntity>;
    userRepository: Repository<UserEntity>;
    projectRepository: Repository<ProjectEntity>;
    organizationRepository: Repository<OrganizationEntity>;
}

const createNotification = ({
    usersIds,
    type,
    text,
    link,
    projectId,
    organizationId,
}: CreateNotificationProps) => (
    async ({ notificationRepository, notificationStateRepository, userRepository, projectRepository, organizationRepository }: Context): Promise<boolean> => {
        // find users
        const users = await userRepository.find({
            where: { id: In(usersIds) },
            relations: {
                notifications: true,
            },
        });

        if (!users) {
            throw new UserError(UserErrorType.NotFound);
        }

        // find organization
        let organization: OrganizationEntity | undefined;
        if (organizationId) {
            organization = await organizationRepository.findOneBy({ id: organizationId }) || undefined;

            if (!organization) {
                throw new OrganizationError(OrganizationErrorType.NotFound);
            }
        }

        // find project
        let project: ProjectEntity | undefined;
        if (projectId) {
            project = await projectRepository.findOneBy({ id: projectId }) || undefined;

            if (!project) {
                throw new ProjectError(ProjectErrorType.NotFound);
            }
        }

        // create notification
        const notification = notificationRepository.create({
            type,
            text,
            link,
            project,
            organization,
        });

        await notificationRepository.save(notification);

        // create notification state
        users.map(async (user) => {
            const membershipEntity = notificationStateRepository.create({
                user,
                notification,
                isNew: true,
            });

            await notificationStateRepository.save(membershipEntity);
        });

        return true;
    }
);

export default createNotification;
