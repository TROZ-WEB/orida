import { FindManyOptions } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum ProjectStatus {
    Design = 'DESIGN', // project is under conception
    Running = 'RUNNING', // project is going on
    Complete = 'COMPLETE', // project has been fully completed
}

class Project {
    id: string;

    createdAt: Date;

    updatedAt: Date;

    budget: Number;

    description: string;

    participatoryBudgetYear: Number;

    startDate: Date;

    status: ProjectStatus;

    title: string;

    constructor(
        createdAt: Date,
        updatedAt: Date,
        budget: Number,
        description: string,
        participatoryBudgetYear: Number,
        startDate: Date,
        status: ProjectStatus,
        title: string,
    ) {
        this.id = uuidv4();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.budget = budget;
        this.description = description;
        this.participatoryBudgetYear = participatoryBudgetYear;
        this.startDate = startDate;
        this.status = status;
        this.title = title;
    }
}

interface ProjectRepository {
    find(condition?: FindManyOptions<Project>): Promise<Project[]>;
    findOne(id: string): Promise<Project | undefined>;
    findOne(condition: Partial<Project>): Promise<Project | undefined>;
    create(details: Partial<Project>): Project;
    save(Project: Project): Promise<Project>;
}

export { Project, ProjectRepository };
