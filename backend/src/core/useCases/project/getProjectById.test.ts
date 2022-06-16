import getProjectById from './getProjectById';

const ProjectDomain = {
    id: '3',
    budget: 10,
    description: 'test',
    participatoryBudgetYear: 2022,
    images: [],
    startDate: undefined,
    status: {
        id: '2',
        label: 'status',
    },
    title: 'test',
    organizations: [],
    categories: [],
    posts: [],
    contributors: [],
    location: undefined,
};

const projectRepository = {
    createProject: () => Promise.resolve(ProjectDomain),
    createProjectImages: () => Promise.resolve(ProjectDomain),
    getAllProjects: () => Promise.resolve([ProjectDomain]),
    getProjectById: () => Promise.resolve(undefined),
    getProjectBySearch: () => Promise.resolve([ProjectDomain]),
    updateProject: () => Promise.resolve(ProjectDomain),
};

const result = getProjectById('3')({ projectRepository });
