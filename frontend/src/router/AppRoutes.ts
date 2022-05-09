enum AppRoutes {
    Accounts = '/accounts',
    Explore = '/explore',
    Home = '/home',
    Login = '/',
    Project = '/project/:projectId',
    Organization = '/organization/:organizationId',
    Search = '/search',
    Test = '/test',
}

export enum ProjectTab {
    general = 'GENERAL',
    statistics = 'STATISTICS',
}

export function castToProjectTab(value: string): ProjectTab {
    switch (value) {
        case 'STATISTICS':
            return ProjectTab.statistics;
        case 'GENERAL':
        default:
            return ProjectTab.general;
    }
}

export function goToProject(id: string, tab: ProjectTab = ProjectTab.general) {
    return `/project/${id}?tab=${tab}`;
}

export function goToOrganization(id: string) {
    return `/organization/${id}`;
}

export default AppRoutes;
