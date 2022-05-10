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

export enum ExploreTab {
    list = 'LIST',
    map = 'MAP',
}

export function castToExploreTab(value: string): ExploreTab {
    switch (value) {
        case 'MAP':
            return ExploreTab.map;
        case 'LIST':
        default:
            return ExploreTab.list;
    }
}

export function goToExplore(tab: ExploreTab = ExploreTab.list) {
    return `/explore?tab=${tab}`;
}

export default AppRoutes;
