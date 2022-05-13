/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import Position from '../types/position';
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

    location?: Position;

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
        location?: Position,
    ) {
        this.createdAt = new Date();
        this.id = uuidv4();
        this.budget = budget;
        this.categories = categories;
        this.description = description;
        this.location = location;
        this.organizations = organizations;
        this.participatoryBudgetYear = participatoryBudgetYear;
        this.posts = posts;
        this.startDate = startDate;
        this.status = status;
        this.title = title;
    }
}

export { Project, ProjectStatus };
