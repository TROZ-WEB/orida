import { ExploreTab, LoginTab, ProjectTab } from './tabs';

enum AppRoutes {
    Accounts = '/accounts',
    Explore = '/explore',
    Profile = '/profile/:userId',
    Home = '/',
    Login = '/login',
    Project = '/project/:projectId',
    Organization = '/organization/:organizationId',
    Search = '/search',
    Test = '/test',
}

export function goToProject(id: string, tab: ProjectTab = ProjectTab.general) {
    return `/project/${id}?tab=${tab}`;
}

export function goToProfile(id: string) {
    return `/profile/${id}`;
}

export function goToOrganization(id: string) {
    return `/organization/${id}`;
}

export function goToExplore(tab: ExploreTab = ExploreTab.list) {
    return `${AppRoutes.Explore}?tab=${tab}`;
}

export function goToLogin(tab?: LoginTab, redirectTo?: string) {
    return `${AppRoutes.Login}?tab=${tab}&redirectTo=${redirectTo}`;
}

export default AppRoutes;
export * from './tabs';
