/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import ProjectContributionDomain from '../../../core/domain/ProjectContribution';
import BaseColumns from './BaseColumns.entity';
import Project from './Project.entity';
import Role from './Role.entity';
import User from './User.entity';

@Entity('project-contribution')
export default class ProjectContribution extends BaseColumns {
    @ManyToOne(() => User, (user: User) => user.organizations, { eager: true, nullable: false })
    @JoinColumn({ name: 'user' })
        user!: User;

    @ManyToOne(() => Project, (project: Project) => project.contributors, { eager: true, nullable: false })
    @JoinColumn({ name: 'project' })
        project!: Project;

    @ManyToOne(() => Role, (role) => role.projectContributions, { eager: true, nullable: false })
    @JoinColumn({ name: 'role' })
        role!: Role;

    toDomain(): ProjectContributionDomain {
        return {
            id: this.id,
            user: this.user.toDomain(),
            project: this.project.toDomain(),
            role: this.role.toDomain(),
        };
    }
}
