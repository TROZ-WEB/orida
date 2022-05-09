/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { OrganizationType, Organization as OrganizationDomain } from '../../../domain/Organization';
import BaseColumns from './BaseColumns';
import { Project } from './Project';

@Entity('organization')
class Organization extends BaseColumns {
    @Column({ type: 'character varying', unique: true })
        name: string;

    @Column({ type: 'enum', enum: OrganizationType, default: OrganizationType.collectivity })
        type: OrganizationType;

    @Column({ type: 'text', nullable: true })
        description:string | null;

    @Column({ type: 'character varying', nullable: true })
        site:string | null;

    @Column({ type: 'character varying', nullable: true })
        email:string | null;

    @Column({ type: 'character varying', nullable: true })
        phone: string | null;

    @Column({ type: 'character varying', nullable: true })
        facebook:string | null;

    @Column({ type: 'character varying', nullable: true })
        twitter:string | null;

    @Column({ type: 'character varying', nullable: true })
        linkedin:string | null;

    @Column({ type: 'character varying', nullable: true })
        instagram:string | null;

    @ManyToMany(() => Project, (project: Project) => project.organizations)
        projects : Project[];

    @ManyToMany(() => Organization, (organization: Organization) => organization.parentOrganizations)
    @JoinTable({ name: 'parent-organizations' })
        parentOrganizations: Organization[];

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        name: string,
        type: OrganizationType,
        description: string | null,
        site: string | null,
        email: string | null,
        phone: string | null,
        facebook: string | null,
        twitter: string | null,
        linkedin: string | null,
        instagram: string | null,
        projects: Project[],
        parentOrganizations: Organization[],
    ) {
        super(id, createdAt, modifiedAt);
        this.name = name;
        this.type = type;
        this.description = description;
        this.site = site;
        this.email = email;
        this.phone = phone;
        this.facebook = facebook;
        this.twitter = twitter;
        this.linkedin = linkedin;
        this.instagram = instagram;
        this.projects = projects;
        this.parentOrganizations = parentOrganizations;
    }

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
        };
    }
}

export { Organization };
