/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { OrganizationMembership as OrganizationMembershipDomain } from '../../../domain/OrganizationMembership';
import BaseColumns from './BaseColumns';
import { Organization } from './Organization';
import { Role } from './Role';
import { User } from './User';

@Entity('organization-membership')
class OrganizationMembership extends BaseColumns {
    @ManyToOne(() => User, (user: User) => user.organizations, { eager: true })
    @JoinColumn({ name: 'user' })
        user: User;

    @ManyToOne(() => Organization, (organization: Organization) => organization.members, { eager: true })
    @JoinColumn({ name: 'organization' })
        organization: Organization;

    @ManyToOne(() => Role, (role) => role.organizationMemberships, { eager: true, nullable: false })
    @JoinColumn({ name: 'role' })
        role: Role;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        user: User,
        organization: Organization,
        role: Role,
    ) {
        super(id, createdAt, modifiedAt);
        this.user = user;
        this.organization = organization;
        this.role = role;
    }

    toDomain(): OrganizationMembershipDomain {
        return {
            id: this.id,
            user: this.user.toDomain(),
            organization: this.organization.toDomain(),
            role: this.role.toDomain(),
        };
    }
}

export { OrganizationMembership };
