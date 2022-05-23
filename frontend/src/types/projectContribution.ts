/* eslint-disable import/no-cycle */
import { Project, ProjectConverter } from '@services/projects';
import { Role, RoleConverter } from '@services/roles';
import { User, UserConverter } from '@services/users';

export type ProjectContribution = {
    project: Project;
    user: User;
    role: Role;
};

export const ProjectContributionConverter = {
    fromApi(data: any): ProjectContribution {
        return {
            // remove rule because functions are exported
            /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
            project: ProjectConverter.fromApi(data.project),
            user: UserConverter.fromApi(data.user),
            role: RoleConverter.fromApi(data.role),
        };
    },
};
