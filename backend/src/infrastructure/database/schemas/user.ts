import { EntitySchema } from 'typeorm';
import { User } from '../../../domain/User';
import BaseColumnsSchema from './baseColumns';

export default new EntitySchema<User>({
    name: User.name,
    target: User,
    columns: {
        ...BaseColumnsSchema,
        email: {
            type: 'character varying',
            unique: true,
        },
        passwordHash: {
            name: 'password-hash',
            type: 'character varying',
        },
        isAdmin: {
            name: 'is-admin',
            type: 'boolean',
        },
    },
});
