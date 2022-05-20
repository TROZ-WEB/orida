/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, OneToMany } from 'typeorm';
import { Role as RoleDomain } from '../../../domain/Role';
import BaseColumns from './BaseColumns';
import { OrganizationMembership } from './OrganizationMembership';

@Entity('role')
class Role extends BaseColumns {
    @Column({ type: 'character varying', nullable: true })
        label: string;

    @OneToMany(() => OrganizationMembership, (organizationMembership) => organizationMembership.role)
        organizationMemberships: OrganizationMembership[];

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        label: string,
    ) {
        super(id, createdAt, modifiedAt);
        this.label = label;
        this.organizationMemberships = [];
    }

    toDomain(): RoleDomain {
        return {
            id: this.id,
            label: this.label,
        };
    }
}

export { Role };
