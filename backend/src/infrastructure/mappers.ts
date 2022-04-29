import { Category } from './database/entities/Category';
import { Project } from './database/entities/Project';
import { User } from './database/entities/User';

export const mapUser = (user: User) => ({
    id: user.id,
    modifiedAt: user.modifiedAt,
    createdAt: user.createdAt,
    email: user.email,
    isAdmin: user.isAdmin,
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
    status: project.status,
    title: project.title,
    categories: project.categories,
});

export const mapCategory = (category: Category) => ({
    id: category.id,
    modifiedAt: category.modifiedAt,
    createdAt: category.createdAt,
    label: category.label,
    picture: category.picture,
    projects: category.projects,
});
