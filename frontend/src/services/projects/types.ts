export enum ProjectStatus {
    Design = 'DESIGN', // project is under conception
    Running = 'RUNNING', // project is going on
    Complete = 'COMPLETE', // project has been fully completed
    Unknown = 'UNKNOWN', // error
}

function castToProjectStatus(value: string) {
    switch (value) {
        case 'DESIGN':
            return ProjectStatus.Design;
        case 'RUNNING':
            return ProjectStatus.Running;
        case 'COMPLETE':
            return ProjectStatus.Complete;
        default:
            return ProjectStatus.Unknown;
    }
}

export type Project = {
    budget: number;
    createdAt: string;
    description: string;
    id: string;
    location: string;
    participatoryBudgetYear: number;
    startDate: Date;
    status: ProjectStatus;
    title: string;
    themes: string[];
    images: string[];
};

export function fromApi(data: any): Project {
    return {
        budget: data.budget,
        createdAt: data.createdAt,
        description: data.description,
        id: data.id,
        location: data.location,
        participatoryBudgetYear: data.participatoryBudgetYear,
        startDate: data.startDate,
        status: castToProjectStatus(data.status),
        title: data.title,
        themes: data.themes ?? [],
        images: data.images,
    };
}

export type CreateProps = {
    title: string;
    description: string;
};
