/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { Category } from './Category';
import { Post } from './Post';
import { ProjectStatus } from './ProjectStatus';

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

    posts: Post[];

    constructor(
        budget: Number,
        description: string,
        participatoryBudgetYear: Number,
        startDate: Date,
        status: ProjectStatus,
        title: string,
        categories: Category[],
        posts: Post[],
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
        this.posts = posts;
    }
}

export { Project, ProjectStatus };
