/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { Project as ProjectEntity } from '../infrastructure/database/entities/Project';
import AppDataSource from '../infrastructure/database/index'; import { Category } from './Category';

enum ProjectStatus {
    Design = 'DESIGN', // project is under conception
    Running = 'RUNNING', // project is going on
    Complete = 'COMPLETE', // project has been fully completed
}

class Project {
    createdAt: Date;

    modifiedAt: Date;

    id: string;

    budget: Number;

    description: string;

    participatoryBudgetYear: Number;

    startDate: Date;

    status: ProjectStatus;

    title: string;

    categories: Category[];

    constructor(
        budget: Number,
        description: string,
        participatoryBudgetYear: Number,
        startDate: Date,
        status: ProjectStatus,
        title: string,
        categories: Category[],
    ) {
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.id = uuidv4();
        this.budget = budget;
        this.description = description;
        this.participatoryBudgetYear = participatoryBudgetYear;
        this.startDate = startDate;
        this.status = status;
        this.title = title;
        this.categories = categories;
    }
}

const projectRepository = AppDataSource.getRepository(ProjectEntity);

export { Project, ProjectStatus, projectRepository };
