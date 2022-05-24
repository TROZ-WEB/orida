/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Message } from './Message';
import { OrganizationMembership } from './OrganizationMembership';
import { ProjectContribution } from './ProjectContribution';

interface UserConstructorProps {
    id: string;
    email: string;
    passwordHash: string | null;
    lastname: string;
    firstname: string;
    fullname: string;
    isAdmin: boolean;
    organizationMemberships: OrganizationMembership[];
    projectContributions: ProjectContribution[];
    messages: Message[],
}

class User {
    id: string;

    email: string;

    passwordHash: string | null = null;

    isAdmin: boolean;

    lastname: string;

    firstname: string;

    fullname: string;

    organizationMemberships: OrganizationMembership[];

    projectContributions: ProjectContribution[];

    messages: Message[];

    constructor({
        id,
        email,
        passwordHash,
        lastname,
        fullname,
        firstname,
        isAdmin,
        organizationMemberships,
        projectContributions,
        messages,
    }: UserConstructorProps) {
        this.id = id ?? uuidv4();
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstname = firstname;
        this.lastname = lastname;
        this.fullname = fullname;
        this.isAdmin = isAdmin;
        this.organizationMemberships = organizationMemberships;
        this.projectContributions = projectContributions;
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
}

export { User };
