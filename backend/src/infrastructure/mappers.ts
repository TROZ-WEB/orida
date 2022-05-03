import { Category } from '../domain/Category';
import { Project } from '../domain/Project';
import { ProjectStatus } from '../domain/ProjectStatus';
import { User } from '../domain/User';

export const mapUser = (user: User) => ({
    id: user.id,
    email: user.email,
    role: user.role,
});

export const mapProjectStatus = (status: ProjectStatus) => ({
    id: status.id,
    label: status.label,
});

export const mapProject = (project: Project) => ({
    modifiedAt: project.modifiedAt,
    createdAt: project.createdAt,
    budget: project.budget,
    description: project.description,
    id: project.id,
    images: [
        'https://placekitten.com/177/177?1',
        'https://placekitten.com/177/177?2',
        'https://placekitten.com/177/177?3',
        'https://placekitten.com/177/177?4',
    ], //! MOCK
    location: '16 Rue Tristan Tzara, 75018 Paris', //! MOCK
    participatoryBudgetYear: project.participatoryBudgetYear,
    startDate: project.startDate,
    status: mapProjectStatus(project.status),
    title: project.title,
    categories: project.categories,
});

export const mapCategory = (category: Category) => ({
    id: category.id,
    modifiedAt: category.modifiedAt,
    createdAt: category.createdAt,
    label: category.label,
    color: category.color,
    projects: category.projects,
});
