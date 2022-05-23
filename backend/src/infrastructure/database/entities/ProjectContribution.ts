/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ProjectContribution as ProjectContributionDomain } from '../../../domain/ProjectContribution';
import BaseColumns from './BaseColumns';
import { Project } from './Project';
import { Role } from './Role';
import { User } from './User';

@Entity('project-contribution')
class ProjectContribution extends BaseColumns {
    @ManyToOne(() => User, (user: User) => user.organizations, { eager: true, nullable: false })
    @JoinColumn({ name: 'user' })
        user: User;

    @ManyToOne(() => Project, (project: Project) => project.contributors, { eager: true, nullable: false })
    @JoinColumn({ name: 'project' })
        project: Project;

    @ManyToOne(() => Role, (role) => role.projectContributions, { eager: true, nullable: false })
    @JoinColumn({ name: 'role' })
        role: Role;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        user: User,
        project: Project,
        role: Role,
    ) {
        super(id, createdAt, modifiedAt);
        this.user = user;
        this.project = project;
        this.role = role;
    }

    toDomain(): ProjectContributionDomain {
        return {
            id: this.id,
            user: this.user.toDomain(),
            project: this.project.toDomain(),
            role: this.role.toDomain(),
        };
    }
}

export { ProjectContribution };
