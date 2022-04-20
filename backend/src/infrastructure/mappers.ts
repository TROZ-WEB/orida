import { Project } from '../domain/Project';
import { User } from '../domain/User';

export const mapUser = (user: User) => ({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
});

export const mapProject = (project: Project) => ({
    id: project.id,
    title: project.title,
    status: project.status,
    theme: 'Environnement', //! MOCK
    budget: 10000, //! MOCK
});
