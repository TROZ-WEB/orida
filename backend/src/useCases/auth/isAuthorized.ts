import Role from '../../domain/Role';
import { User } from '../../domain/User';

const isAuthorized = (user: User, roles: Role[]): boolean => {
    let granted = true;
    const normalizedRole = user.role ?? Role.None;

    if (roles.includes(Role.Admin)) {
        granted = [Role.Admin].includes(normalizedRole);
    }

    if (roles.includes(Role.Manager)) {
        granted = [Role.Admin, Role.Manager].includes(normalizedRole);
    }

    return granted;
};

export default isAuthorized;
