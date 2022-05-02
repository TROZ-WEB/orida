/* eslint-disable import/prefer-default-export */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import { Entity, Column } from 'typeorm';
import Role from '../../../domain/Role';
import { User as UserDomain } from '../../../domain/User';
import BaseColumns from './BaseColumns';

@Entity('user')
class User extends BaseColumns {
    @Column({ type: 'character varying', unique: true })
        email: string;

    @Column({ type: 'character varying', name: 'password-hash' })
        passwordHash: string | null;

    @Column({ type: 'boolean', name: 'is-admin' })
        isAdmin: boolean;

    @Column({ type: 'boolean', name: 'is-manager' })
        isManager: boolean;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        email: string,
        passwordHash: string,
        isAdmin: boolean,
        isManager: boolean,
    ) {
        super(id, createdAt, modifiedAt);
        this.email = email;
        this.passwordHash = passwordHash;
        this.isAdmin = isAdmin;
        this.isManager = isManager;
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

    computeRole() {
        if (this.isAdmin) { return Role.Admin; }
        if (this.isManager) { return Role.Manager; }

        return Role.None;
    }

    toDomain(): UserDomain {
        return new UserDomain({
            email: this.email,
            role: this.computeRole(),
            passwordHash: this.passwordHash,
            id: this.id,
        });
    }
}

export { User };
