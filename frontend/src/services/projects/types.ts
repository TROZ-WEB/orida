import Post, { PostConverter } from '@customTypes/post';
import { Category, CategoryConverter } from '@services/categories';
import { Status, StatusConverter } from '@services/status';

export type Project = {
    budget: number;
    categories: Category[];
    createdAt: Date;
    description: string;
    id: string;
    images: string[];
    location: string;
    modifiedAt: Date;
    participatoryBudgetYear: number;
    posts: Post[];
    startDate: Date;
    status: Status;
    title: string;
};

export function fromApi(data: any): Project {
    return {
        budget: data.budget,
        categories:
            data.categories.map((category: Category) => CategoryConverter.fromApi(category)) ?? [],
        createdAt: data.createdAt,
        description: data.description,
        id: data.id,
        images: data.images,
        location: data.location,
        modifiedAt: data.modifiedAt,
        participatoryBudgetYear: data.participatoryBudgetYear,
        posts: data.posts.map((post: any) => PostConverter.fromApi(post)),
        startDate: data.startDate,
        status: StatusConverter.fromApi(data.status),
        title: data.title,
    };
}

export type CreateProps = {
    budget?: number;
    categories?: string[];
    description?: string;
    images?: string[];
    location?: string;
    participatoryBudgetYear?: number;
    startDate?: Date;
    statusId: string;
    title: string;
};
