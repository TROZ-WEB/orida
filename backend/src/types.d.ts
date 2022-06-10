import UserDomain from './core/domain/User';

declare global {
    namespace Express {
        interface User extends UserDomain {}
    }
}
