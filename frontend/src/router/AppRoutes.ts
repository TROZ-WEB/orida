enum AppRoutes {
    Login = '/',
    Home = '/home',
    Search = '/search',
    Project = '/project/:projectId',
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

export default AppRoutes;
