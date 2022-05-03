import { Category, CategoryConverter } from '@services/categories';
import { Status, StatusConverter } from '@services/status';

export type Project = {
    budget: number;
    createdAt: Date;
    modifiedAt: Date;
    description: string;
    id: string;
    location: string;
    participatoryBudgetYear: number;
    startDate: Date;
    status: Status;
    title: string;
    categories: Category[];
    images: string[];
};

export function fromApi(data: any): Project {
    return {
        budget: data.budget,
        createdAt: data.createdAt,
        modifiedAt: data.modifiedAt,
        description: data.description,
        id: data.id,
        location: data.location,
        participatoryBudgetYear: data.participatoryBudgetYear,
        startDate: data.startDate,
        status: StatusConverter.fromApi(data.status),
        title: data.title,
        categories:
            data.categories.map((category: Category) => CategoryConverter.fromApi(category)) ?? [],
        images: data.images,
    };
}

export type CreateProps = {
    budget?: number;
    description?: string;
    location?: string;
    participatoryBudgetYear?: number;
    startDate?: Date;
    statusId: string;
    title: string;
    categories?: string[];
    images?: string[];
};
