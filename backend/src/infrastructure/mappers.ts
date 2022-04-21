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
    themes: ['Environnement'], //! MOCK
    budget: 10000, //! MOCK
    location: '16 Rue Tristan Tzara, 75018 Paris', //! MOCK
    // eslint required for mock reasons ; to be deleted
    /* eslint-disable-next-line max-len */
    description: 'Ce jardin, imaginé par la paysagiste Kathryn Gustafson, abrite des essences variées. Il vous fait découvrir le copalme, le micocoulier, le charme et le chêne pyramidal, des tulipiers et des paulownias, un mail de tilleul et de cerisiers à fleurs, mais aussi des érables à peau de serpent. Une passerelle traverse le jardin.A l’entrée, des gradins sont disposés autour d’un vaste bassin d’où s’échappe un petit ruisseau.Il est entouré de massifs de bambous et de rosiers, de haies de viornes et de parterres de fleurs composés par les jardiniers.', //! MOCK
    images: [
        'https://placekitten.com/177/177?1',
        'https://placekitten.com/177/177?2',
        'https://placekitten.com/177/177?3',
        'https://placekitten.com/177/177?4',
    ], //! MOCK
});
