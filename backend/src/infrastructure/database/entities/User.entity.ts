/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import { Entity, Column, OneToMany } from 'typeorm';
import UserDomain from '../../../core/domain/User';
import BaseColumns from './BaseColumns.entity';
import Message from './Message.entity';
import OrganizationMembership from './OrganizationMembership.entity';
import PollResponse from './PollResponse.entity';
import ProjectContribution from './ProjectContribution.entity';

@Entity('user')
export default class User extends BaseColumns {
    @Column({ type: 'character varying', unique: true })
        email!: string;

    @Column({ type: 'character varying', name: 'password-hash' })
        passwordHash!: string | null;

    @Column({ type: 'boolean', name: 'is-admin' })
        isAdmin!: boolean;

    @Column({ type: 'character varying', default: 'noname' })
        lastname!: string;

    @Column({ type: 'character varying', default: 'noname' })
        firstname!: string;

    @Column({ type: 'character varying', default: 'noname' })
        fullname!: string;

    @OneToMany(() => PollResponse, (response) => response.user, { cascade: true })
        pollResponses: PollResponse[] = [];

    @OneToMany(() => OrganizationMembership, (organizationMembership) => organizationMembership.user, { cascade: true })
        organizations: OrganizationMembership[] = [];

    @OneToMany(() => Message, (message: Message) => message.author, { cascade: true })
        messages: Message[] = [];

    @OneToMany(() => ProjectContribution, (projectContribution) => projectContribution.user, { cascade: true })
        projects: ProjectContribution[] = [];

    async updatePassword(password: string): Promise<void> {
        this.passwordHash = await bcrypt.hash(password, 10);
    }

    async checkPassword(password: string): Promise<boolean> {
        if (this.passwordHash === null) {
            return false;
        }

        return bcrypt.compare(password, this.passwordHash);
    }

    toDomain(): UserDomain {
        return ({
            email: this.email,
            firstname: this.firstname,
            fullname: this.fullname,
            id: this.id,
            lastname: this.lastname,
            passwordHash: this.passwordHash,
            isAdmin: this.isAdmin,
            organizationMemberships: this.organizations?.map((membership) => membership.toDomain()) ?? [],
            messages: this.messages?.map((m) => m.toDomain()) ?? [],
            projectContributions: this.projects?.map((membership) => membership.toDomain()) ?? [],
        });
    }
}
