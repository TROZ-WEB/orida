/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, OneToMany } from 'typeorm';
import RoleDomain from '../../../core/domain/Role';
import BaseColumns from './BaseColumns.entity';
import OrganizationMembership from './OrganizationMembership.entity';
import ProjectContribution from './ProjectContribution.entity';

@Entity('role')
export default class Role extends BaseColumns {
    @Column({ type: 'character varying', nullable: true })
        label!: string;

    @OneToMany(() => OrganizationMembership, (organizationMembership) => organizationMembership.role)
        organizationMemberships: OrganizationMembership[] = [];

    @OneToMany(() => ProjectContribution, (projectContribution) => projectContribution.role)
        projectContributions: ProjectContribution[] = [];

    toDomain(): RoleDomain {
        return {
            id: this.id,
            label: this.label,
        };
    }
}
