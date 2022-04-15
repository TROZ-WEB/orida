import { v4 as uuidv4 } from 'uuid';

export enum ProjectStatus {
    Design = 'DESIGN', // project is under conception
    Running = 'RUNNING', // project is going on
    Complete = 'COMPLETE', // project has been fully completed
}

class Project {
    id: string;

    title: string;

    status: ProjectStatus;

    constructor(title: string, status: ProjectStatus) {
        this.id = uuidv4();
        this.title = title;
        this.status = status;
    }
}

interface ProjectRepository {
    find(): Promise<Project[]>;
    findOne(id: string): Promise<Project | undefined>;
    findOne(condition: Partial<Project>): Promise<Project | undefined>;
    create(details: Partial<Project>): Project;
    save(Project: Project): Promise<Project>;
}

export { Project, ProjectRepository };
