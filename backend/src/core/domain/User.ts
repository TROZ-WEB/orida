/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import Message from './Message';
import OrganizationMembership from './OrganizationMembership';
import ProjectContribution from './ProjectContribution';

 interface User {
    id: string;
    email: string;
    passwordHash: string | null;
    lastname: string;
    firstname: string;
    fullname: string;
    isAdmin: boolean;
    organizationMemberships: OrganizationMembership[];
    projectContributions: ProjectContribution[];
    messages: Message[];
}

// export const updatePassword = async (user: User, password: string): Promise<void> => {
//     user.passwordHash = await bcrypt.hash(password, 10);
// };

export const checkPassword = async (user: User, password: string): Promise<boolean> => {
    if (user.passwordHash === null) {
        return false;
    }

    return bcrypt.compare(password, user.passwordHash);
};

export default User;
