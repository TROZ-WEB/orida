/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { OrganizationMembership as OrganizationMembershipDomain } from '../../../domain/OrganizationMembership';
import BaseColumns from './BaseColumns';
import { Organization } from './Organization';
import { User } from './User';

@Entity('organization-membership')
class OrganizationMembership extends BaseColumns {
    @ManyToOne(() => User, (user: User) => user.organizations, { eager: true })
    @JoinColumn({ name: 'user' })
        user: User;

    @ManyToOne(() => Organization, (organization: Organization) => organization.members, { eager: true })
    @JoinColumn({ name: 'organization' })
        organization: Organization;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        user: User,
        organization: Organization,
    ) {
        super(id, createdAt, modifiedAt);
        this.user = user;
        this.organization = organization;
    }

    toDomain(): OrganizationMembershipDomain {
        return {
            id: this.id,
            user: this.user.toDomain(),
            organization: this.organization.toDomain(),
        };
    }
}

export { OrganizationMembership };
