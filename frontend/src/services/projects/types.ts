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

export type Category = {
    createdAt: Date;
    modifiedAt: Date;
    id: string;
    label: string;
    picture: string;
};

export type Project = {
    budget: number;
    createdAt: Date;
    modifiedAt: Date;
    description: string;
    id: string;
    location: string;
    participatoryBudgetYear: number;
    startDate: Date;
    status: ProjectStatus;
    title: string;
    categories: Category[];
    images: string[];
};

export function fromApi(data: any): Project {
    return {
        budget: data.budget,
        createdAt: data.createdAt,
        modifiedAt: data.modifiedAt,
        description: data.description,
        id: data.id,
        location: data.location,
        participatoryBudgetYear: data.participatoryBudgetYear,
        startDate: data.startDate,
        status: castToProjectStatus(data.status),
        title: data.title,
        categories: data.categories ?? [],
        images: data.images,
    };
}

export type CreateProps = {
    budget?: number;
    description?: string;
    location?: string;
    participatoryBudgetYear?: number;
    startDate?: Date;
    status: ProjectStatus;
    title: string;
    categories?: string[];
    images?: string[];
};
