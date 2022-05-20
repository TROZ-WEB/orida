import { User } from '../../domain/User';

const isAdmin = (user: User): boolean => user.isAdmin;

export default isAdmin;
