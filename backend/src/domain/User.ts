import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User as UserEntity } from '../infrastructure/database/entities/User';
import AppDataSource from '../infrastructure/database/index';

class User {
    createdAt: Date;

    modifiedAt: Date;

    id: string;

    email: string;

    passwordHash: string | null = null;

    isAdmin: boolean;

    constructor(
        email: string,
        isAdmin: boolean = false,
    ) {
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.id = uuidv4();
        this.email = email;
        this.isAdmin = isAdmin;
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

const userRepository = AppDataSource.getRepository(UserEntity);

export { User, userRepository };
