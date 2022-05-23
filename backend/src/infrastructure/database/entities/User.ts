/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import { Entity, Column, OneToMany } from 'typeorm';
import { User as UserDomain } from '../../../domain/User';
import BaseColumns from './BaseColumns';
import { Message } from './Message';
import { OrganizationMembership } from './OrganizationMembership';
import { PollResponse } from './PollResponse';

@Entity('user')
class User extends BaseColumns {
    @Column({ type: 'character varying', unique: true })
        email: string;

    @Column({ type: 'character varying', name: 'password-hash' })
        passwordHash: string | null;

    @Column({ type: 'boolean', name: 'is-admin' })
        isAdmin: boolean;

    @Column({ type: 'character varying', default: 'noname' })
        lastname: string;

    @Column({ type: 'character varying', default: 'noname' })
        firstname: string;

    @Column({ type: 'character varying', default: 'noname' })
        fullname: string;

    @OneToMany(() => PollResponse, (response: PollResponse) => response.user, { cascade: true })
        pollResponses: PollResponse[];

    @OneToMany(
        () => OrganizationMembership,
        (organizationMembership) => organizationMembership.user,
        { cascade: true },
    )
        organizations?: OrganizationMembership[];

    @OneToMany(() => Message, (message: Message) => message.author, { cascade: true })
        messages: Message[];

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        email: string,
        isAdmin: boolean,
        firstname: string,
        lastname: string,
        fullname: string,
        pollResponses: PollResponse[],
        organizations: OrganizationMembership[],
        messages: Message[],
    ) {
        super(id, createdAt, modifiedAt);
        this.email = email;
        this.firstname = firstname;
        this.fullname = fullname;
        this.isAdmin = isAdmin;
        this.lastname = lastname;
        this.passwordHash = '';
        this.pollResponses = pollResponses;
        this.organizations = organizations;
        this.messages = messages;
    }

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
        return new UserDomain({
            email: this.email,
            firstname: this.firstname,
            fullname: this.fullname,
            id: this.id,
            lastname: this.lastname,
            passwordHash: this.passwordHash,
            isAdmin: this.isAdmin,
            organizationMemberships: this.organizations?.map((membership) => membership.toDomain()) ?? [],
        });
    }
}

export { User };
