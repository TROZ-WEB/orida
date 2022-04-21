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
    id: string;
    title: string;
    status: ProjectStatus;
    themes: string[];
    budget: number;
    location: string;
    description: string;
    images: string[];
};

export function fromApi(data: any): Project {
    return {
        id: data.id,
        title: data.title,
        status: castToProjectStatus(data.status),
        themes: data.themes ?? [],
        budget: data.budget,
        location: data.location,
        description: data.description,
        images: data.images,
    };
}

export type CreateProps = {
    title: string;
};
