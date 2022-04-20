export enum ProjectStatus {
    Design = 'DESIGN', // project is under conception
    Running = 'RUNNING', // project is going on
    Complete = 'COMPLETE', // project has been fully completed
}

export type Project = {
    id: string;
    title: string;
    status: ProjectStatus;
    theme: string;
    budget: number;
}

export type CreateProps = {
    title: string;
}
