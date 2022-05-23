/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import { Project } from './Project';
import { Role } from './Role';
import { User } from './User';

class ProjectContribution {
    id: string;

    user: User;

    project: Project;

    role: Role;

    constructor(
        user: User,
        project: Project,
        role: Role,
    ) {
        this.id = uuidv4();
        this.user = user;
        this.project = project;
        this.role = role;
    }
}

export { ProjectContribution };
