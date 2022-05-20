import { callbackify } from 'util';
import { Authenticator } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../domain/User';
import UserError from '../useCases/auth/AuthError';
import loginUser from '../useCases/auth/loginUser';
import findOneUserById from '../useCases/users/findOneUserById';
import { userRepository } from './database';

const auth = new Authenticator();

// User serializing
auth.serializeUser(callbackify(async (user: User): Promise<string> => user.id));

auth.deserializeUser(
    callbackify(async (id: string): Promise<User | null> => findOneUserById(id)({ userRepository })),
);

// Strategies
auth.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (username, password, done): Promise<void> => {
            try {
                done(null, await loginUser({ username, password })({ userRepository }));
            } catch (error) {
                if (error instanceof UserError) {
                    done(null, false, { message: error.message });
                } else {
                    done(error);
                }
            }
        },
    ),
);

export default auth;
