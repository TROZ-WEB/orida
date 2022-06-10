/* eslint-disable import/no-cycle */
import Project from './Project';
import Role from './Role';
import User from './User';

interface ProjectContribution {
    id: string;
    user: User;
    project: Project;
    role: Role;
}

export default ProjectContribution;
