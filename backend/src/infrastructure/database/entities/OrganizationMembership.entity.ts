/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import OrganizationMembershipDomain from '../../../core/domain/OrganizationMembership';
import BaseColumns from './BaseColumns.entity';
import Organization from './Organization.entity';
import Role from './Role.entity';
import User from './User.entity';

@Entity('organization-membership')
export default class OrganizationMembership extends BaseColumns {
    @ManyToOne(() => User, (user: User) => user.organizations, { eager: true })
    @JoinColumn({ name: 'user' })
        user!: User;

    @ManyToOne(() => Organization, (organization: Organization) => organization.members, { eager: true })
    @JoinColumn({ name: 'organization' })
        organization!: Organization;

    @ManyToOne(() => Role, (role) => role.organizationMemberships, { eager: true, nullable: false })
    @JoinColumn({ name: 'role' })
        role!: Role;

    toDomain(): OrganizationMembershipDomain {
        return {
            id: this.id,
            user: this.user.toDomain(),
            organization: this.organization.toDomain(),
            role: this.role.toDomain(),
        };
    }
}
