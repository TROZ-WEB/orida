/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
import Project from './Project';
import Role, { roleSnapshot } from './Role';
import User, { userSnapshot } from './User';

interface ProjectContribution {
    id: string;
    user: User;
    project: Project;
    role: Role;
}

export const projectContributionSnapshot = (projectContribution: ProjectContribution): ProjectContribution => Object.freeze({
    ...projectContribution,
    user: userSnapshot(projectContribution.user),
    role: roleSnapshot(projectContribution.role),
});

export default ProjectContribution;
