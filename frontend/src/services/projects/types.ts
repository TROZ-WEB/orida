/* eslint-disable import/no-cycle */
import Position, { PositionConverter } from '@customTypes/position';
import Post, { PostConverter } from '@customTypes/post';
import {
    ProjectContribution,
    ProjectContributionConverter,
} from '@customTypes/projectContribution';
import { Category, CategoryConverter } from '@services/categories';
import { Organization } from '@services/organizations';
import { Status, StatusConverter } from '@services/status';

export type Project = {
    budget: number;
    categories: Category[];
    contributors: ProjectContribution[];
    createdAt: Date;
    description: string;
    id: string;
    images: string[];
    location?: Position;
    modifiedAt: Date;
    organizations: Organization[];
    participatoryBudgetYear: number;
    posts: Post[];
    startDate: Date;
    status: Status;
    title: string;
};

export const ProjectConverter = {
    fromApi(data: any): Project {
        return {
            budget: data.budget,
            categories:
                data.categories.map((category: Category) => CategoryConverter.fromApi(category)) ??
                [],
            contributors: data.contributors.map(ProjectContributionConverter.fromApi),
            createdAt: data.createdAt,
            description: data.description,
            id: data.id,
            images: data.images,
            location: data.location ? PositionConverter.fromApi(data.location) : undefined,
            modifiedAt: data.modifiedAt,
            organizations: data.organizations,
            participatoryBudgetYear: data.participatoryBudgetYear,
            posts: data.posts.map((post: any) => PostConverter.fromApi(post)),
            startDate: data.startDate,
            status: StatusConverter.fromApi(data.status),
            title: data.title,
        };
    },
};

export type CreateProps = {
    budget?: number;
    categories?: string[];
    description?: string;
    images?: string[];
    location?: Position;
    organizations?: string[];
    participatoryBudgetYear?: number;
    startDate?: Date;
    statusId: string;
    title: string;
};
