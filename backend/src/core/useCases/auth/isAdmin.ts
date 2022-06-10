import UserDomain from '../../domain/User';

const isAdmin = (user: UserDomain): boolean => user.isAdmin;

export default isAdmin;
