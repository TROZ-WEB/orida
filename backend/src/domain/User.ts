import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export enum UserType {
    Citizen = 'CITIZEN',
    Community = 'COMMUNITY',
}

export function castToUserType(value: string): UserType {
    switch (value) {
        case 'COMMUNITY':
            return UserType.Community;
        case 'CITIZEN':
        default:
            return UserType.Citizen;
    }
}

class User {
    id: string;

    email: string;

    passwordHash: string | null = null;

    type: UserType;

    constructor(email: string, type: UserType) {
        this.id = uuidv4();
        this.email = email;
        this.type = type;
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

interface UserRepository {
    findOne(id: string): Promise<User | undefined>;
    findOne(condition: Partial<User>): Promise<User | undefined>;
    create(details: Partial<User>): User;
    save(user: User): Promise<User>;
}

export { User, UserRepository };
