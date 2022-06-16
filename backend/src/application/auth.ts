import { callbackify } from 'util';
import { Authenticator } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserDomain from '../core/domain/User';
import UserError from '../core/errors/UserError';
import COREUserRepository from '../core/ports/repositories/COREUserRepository';
import loginUser from '../core/useCases/auth/loginUser';
import getUserById from '../core/useCases/user/getUserById';

const auth = new Authenticator();

// User serializing

interface initializeProps {
    userRepository: COREUserRepository
}

const initialize = ({ userRepository }: initializeProps) => {
    auth.serializeUser(callbackify(async (user: UserDomain): Promise<string> => user.id));
    auth.deserializeUser(
        callbackify(async (id: string): Promise<UserDomain | null> => getUserById(id)({ userRepository })),
    );

    // Strategies
    auth.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done): Promise<void> => {
                try {
                    done(null, await loginUser({ email, password })({ userRepository }));
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

    return auth.initialize();
};

const session = () => auth.session();

export default { initialize, session };
