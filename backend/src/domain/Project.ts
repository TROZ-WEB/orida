/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { Category } from './Category';
import { Organization } from './Organization';
import { Post } from './Post';
import { ProjectStatus } from './ProjectStatus';

class Project {
    createdAt: Date;

    id: string;

    budget: Number;

    description: string | null;

    participatoryBudgetYear: Number | null;

    startDate: Date | null;

    status: ProjectStatus;

    title: string;

    organizations: Organization[];

    categories: Category[];

    posts: Post[];

    constructor(
        budget: Number,
        description: string | null,
        participatoryBudgetYear: Number | null,
        startDate: Date | null,
        status: ProjectStatus,
        title: string,
        organizations: Organization[],
        categories: Category[],
        posts: Post[],
    ) {
        this.createdAt = new Date();
        this.id = uuidv4();
        this.budget = budget;
        this.description = description;
        this.participatoryBudgetYear = participatoryBudgetYear;
        this.startDate = startDate;
        this.status = status;
        this.title = title;
        this.organizations = organizations;
        this.categories = categories;
        this.posts = posts;
    }
}

export { Project, ProjectStatus };
