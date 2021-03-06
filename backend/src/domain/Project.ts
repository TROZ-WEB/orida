/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import Position from '../types/position';
import { Category } from './Category';
import { Image } from './Image';
import { Organization } from './Organization';
import { Post } from './Post';
import { ProjectContribution } from './ProjectContribution';
import { ProjectStatus } from './ProjectStatus';

class Project {
    createdAt: Date;

    id: string;

    budget: Number;

    description: string | null;

    participatoryBudgetYear: Number | null;

    images: Image[];

    startDate: Date | null;

    status: ProjectStatus;

    title: string;

    organizations: Organization[];

    categories: Category[];

    posts: Post[];

    location?: Position;

    contributors: ProjectContribution[];

    constructor(
        budget: Number,
        description: string | null,
        participatoryBudgetYear: Number | null,
        images: Image[],
        startDate: Date | null,
        status: ProjectStatus,
        title: string,
        organizations: Organization[],
        categories: Category[],
        posts: Post[],
        contributors: ProjectContribution[],
        location?: Position,
    ) {
        this.budget = budget;
        this.categories = categories;
        this.contributors = contributors;
        this.createdAt = new Date();
        this.description = description;
        this.id = uuidv4();
        this.location = location;
        this.organizations = organizations;
        this.participatoryBudgetYear = participatoryBudgetYear;
        this.posts = posts;
        this.images = images;
        this.startDate = startDate;
        this.status = status;
        this.title = title;
    }
}

export { Project, ProjectStatus };
