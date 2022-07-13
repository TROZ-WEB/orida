/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import Message, { messageSnapshot } from './Message';
import OrganizationMembership, { organizationMembershipSnapshot } from './OrganizationMembership';
import ProjectContribution, { projectContributionSnapshot } from './ProjectContribution';

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

export const updatePassword = async (user: User, password: string): Promise<void> => {
    user.passwordHash = await bcrypt.hash(password, 10);
};

export const checkPassword = async (user: User, password: string): Promise<boolean> => {
    if (user.passwordHash === null) {
        return false;
    }

    return bcrypt.compare(password, user.passwordHash);
};

export const isAdmin = (user: User): boolean => user.isAdmin;

export const isAdminOfOrganization = (user: User, organizationId: string): boolean => {
    const isMember = user.organizationMemberships.find((membership) => membership.organization.id === organizationId);
    if (!isMember) { return false; }

    return isMember.role.label === 'ADMIN' || isAdmin(user);
};

export const isAdminOfProject = (user: User, projectId: string) => {
    // True if user is admin of at least one organization of the project
    const isOrganizationAdmin = user.organizationMemberships.length > 0 && user.organizationMemberships.reduce(
        (isOrgaAdmin, member) => (member.role.label === 'ADMIN'
                && member.organization.projects.findIndex((project) => project.id === projectId) !== -1
            ? isOrgaAdmin
            : false),
        true,
    );

    const isMember = user.projectContributions.find((contribution) => contribution.project.id === projectId);

    return isMember?.role.label === 'ADMIN' || isOrganizationAdmin || isAdmin(user);
};

export const isCollaboratorOfOrganization = (user: User, organizationId: string): boolean => {
    const isMember = user.organizationMemberships.find((membership) => membership.organization.id === organizationId);
    if (!isMember) { return false; }

    return isMember.role.label === 'ADMIN' || isMember.role.label === 'COLLABORATOR' || isAdmin(user);
};

export const userSnapshot = (user: User): User => Object.freeze({
    ...user,
    organizationMemberships: user.organizationMemberships.map(organizationMembershipSnapshot),
    projectContributions: user.projectContributions.map(projectContributionSnapshot),
    messages: user.messages.map(messageSnapshot),
});

export default User;
