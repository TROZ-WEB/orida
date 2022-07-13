/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import OrganizationDomain, { OrganizationType } from '../../../core/domain/Organization';
import BaseColumns from './BaseColumns.entity';
import OrganizationMembership from './OrganizationMembership.entity';
import Project from './Project.entity';

@Entity('organization')
export default class Organization extends BaseColumns {
    @Column({ type: 'character varying', unique: true })
        name!: string;

    @Column({ type: 'character varying' })
        type!: OrganizationType;

    @Column({ type: 'text', nullable: true })
        description: string | undefined;

    @Column({ type: 'character varying', nullable: true })
        site: string | undefined;

    @Column({ type: 'character varying', nullable: true })
        email: string | undefined;

    @Column({ type: 'character varying', nullable: true })
        phone: string | undefined;

    @Column({ type: 'character varying', nullable: true })
        facebook: string | undefined;

    @Column({ type: 'character varying', nullable: true })
        twitter: string | undefined;

    @Column({ type: 'character varying', nullable: true })
        linkedin: string | undefined;

    @Column({ type: 'character varying', nullable: true })
        instagram: string | undefined;

    @ManyToMany(() => Project, (project: Project) => project.organizations)
        projects: Project[] = [];

    @ManyToMany(() => Organization, (organization: Organization) => organization.parentOrganizations)
    @JoinTable({ name: 'parent-organizations' })
        parentOrganizations: Organization[] = [];

    @OneToMany(
        () => OrganizationMembership,
        (organizationMembership) => organizationMembership.organization,
        { cascade: true },
    )
        members: OrganizationMembership[] = [];

    toDomain(): OrganizationDomain {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            description: this.description,
            site: this.site,
            email: this.email,
            phone: this.phone,
            facebook: this.facebook,
            twitter: this.twitter,
            linkedin: this.linkedin,
            instagram: this.instagram,
            projects: this.projects?.map((p) => p.toDomain()) || [],
            parentOrganizations: this.parentOrganizations?.map((o) => o.toDomain()) || [],
            members: this.members ? this.members.map((member) => member.toDomain()) : [],
        };
    }
}
