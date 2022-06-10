import UserDomain from '../../domain/User';

interface createUserProps {
    firstname:string,
    lastname:string,
    email:string,
    password:string,
}
interface COREUserRepository {
    createUser(userData: createUserProps): Promise<UserDomain>;
    getAllUsers(): Promise<UserDomain[]>;
    getUserById(id: string): Promise<UserDomain | undefined>;
    getUserByEmail(email: string): Promise<UserDomain | undefined>;
}

export default COREUserRepository;
