import { User } from '../../domain/User';

const isAdminOfProject = (user: User, projectId: string): boolean => {
    const isMember = user.projectContributions.find((contribution) => contribution.project.id === projectId);
    if (!isMember) { return false; }

    return isMember.role.label === 'ADMIN';
};

export default isAdminOfProject;
