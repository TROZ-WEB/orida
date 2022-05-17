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

export enum LoginTab {
    Login = 'LOGIN',
    Register = 'REGISTER',
}

export function castToLoginTab(value: string | null): LoginTab {
    switch (value) {
        case 'REGISTER':
            return LoginTab.Register;
        case 'LOGIN':
        default:
            return LoginTab.Login;
    }
}
