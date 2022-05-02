/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Role from './Role';

interface UserConstructorProps {
    id: string;
    email: string;
    role?: Role;
    passwordHash: string | null;
}

class User {
    id: string;

    email: string;

    passwordHash: string | null = null;

    role?: Role;

    constructor({
        id,
        email,
        role,
        passwordHash,
    }: UserConstructorProps) {
        this.id = id ?? uuidv4();
        this.email = email;
        this.role = role;
        this.passwordHash = passwordHash;
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
