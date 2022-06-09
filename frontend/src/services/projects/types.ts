/* eslint-disable import/no-cycle */
import Position, { PositionConverter } from '@customTypes/position';
import Post, { PostConverter } from '@customTypes/post';
import {
    ProjectContribution,
    ProjectContributionConverter,
} from '@customTypes/projectContribution';
import { Category, CategoryConverter } from '@services/categories';
import { Image, ImageConverter } from '@services/images';
import { Organization } from '@services/organizations';
import { Role, RoleConverter } from '@services/roles';
import { Status, StatusConverter } from '@services/status';
import { User, UserConverter } from '@services/users';

export type projectContributions = {
    project: Project;
    user: User;
    role: Role;
};

export const projectContributionsConverter = {
    fromApi(data: any): projectContributions {
        return {
            // remove rule because functions are exported
            /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
            project: ProjectConverter.fromApi(data.project),
            user: UserConverter.fromApi(data.user),
            role: RoleConverter.fromApi(data.role),
        };
    },
};

export type Project = {
    budget: number;
    categories: Category[];
    contributors: ProjectContribution[];
    createdAt: Date;
    description: string;
    id: string;
    images: Image[];
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
            categories: data.categories?.map(CategoryConverter.fromApi) ?? [],
            contributors: data.contributors?.map(ProjectContributionConverter.fromApi) ?? [],
            createdAt: data.createdAt,
            description: data.description,
            id: data.id,
            images: data.images?.map(ImageConverter.fromApi) ?? [],
            location: data.location ? PositionConverter.fromApi(data.location) : undefined,
            modifiedAt: data.modifiedAt,
            organizations: data.organizations,
            participatoryBudgetYear: data.participatoryBudgetYear,
            posts: data.posts?.map(PostConverter.fromApi) ?? [],
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

export type UpdateProps = CreateProps & {
    id: string;
    project: string;
};

export type AddImagesProps = {
    id: string;
    images: string[];
};
