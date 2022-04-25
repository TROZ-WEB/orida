import { Project } from '../domain/Project';
import { User } from '../domain/User';

export const mapUser = (user: User) => ({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
});

export const mapProject = (project: Project) => ({
    budget: project.budget,
    createdAt: project.createdAt,
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
    themes: ['Environnement'], //! MOCK
});

//! ANY TO FIX
export const mapCategory = (category: any) => ({
    id: category.id,
    label: category.label,
    picture: category.picture,
});
