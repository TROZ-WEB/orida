/* eslint-disable import/no-cycle */
import Budget from '@customTypes/budget';
import {
    ProjectContribution,
    ProjectContributionConverter,
} from '@customTypes/projectContribution';
import { Category } from '@services/categories';
import { Status } from '@services/status';
import { DELETE, GET, POST } from '@utils/http';

import { CreateProps, Project, ProjectConverter } from './types';

async function getAll(): Promise<Project[]> {
    try {
        const response = await GET<Project[]>('/api/projects/');

        return response.map(ProjectConverter.fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::getAll Unhandled error');
    }
}

async function getOne(id: string): Promise<Project | undefined> {
    try {
        const response = await GET<Project>(`/api/projects/${id}`);

        return ProjectConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::getOne Unhandled error');
    }
}

async function create(props: CreateProps): Promise<Project> {
    try {
        const response = await POST<Project>('/api/projects/', {
            ...props,
        });

        return ProjectConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::create Unhandled error');
    }
}

interface SearchProps {
    status?: Status[];
    search?: string;
    categories?: Category[];
    budgets?: Budget[];
}

async function search({
    categories,
    status,
    search: searchStr,
    budgets,
}: SearchProps): Promise<Project[]> {
    try {
        const response = await POST<Project[]>('/api/projects/search', {
            status: status?.map((s) => s.id),
            categories: categories?.map((c) => c.id),
            search: searchStr,
            budgets,
        });

        return response.map(ProjectConverter.fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::search Unhandled error');
    }
}

interface AddContributorProps {
    projectId: string;
    roleId: string;
    userId: string;
}
async function addContributor({
    projectId,
    roleId,
    userId,
}: AddContributorProps): Promise<boolean> {
    try {
        await POST<Project[]>('/api/projects/add-contributor', {
            project: projectId,
            role: roleId,
            user: userId,
        });

        return true;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::addContributor Unhandled error');
    }
}

interface RemoveContributorProps {
    projectId: string;
    userId: string;
}
async function removeContributor({ projectId, userId }: RemoveContributorProps): Promise<boolean> {
    try {
        await DELETE<Project[]>('/api/projects/contributor', {
            project: projectId,
            user: userId,
        });

        return true;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::addContributor Unhandled error');
    }
}

async function getContributors(): Promise<ProjectContribution[]> {
    try {
        const result = await GET<ProjectContribution[]>('/api/projects/contributors');

        return result.map(ProjectContributionConverter.fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::addContributor Unhandled error');
    }
}

const ProjectService = {
    addContributor,
    create,
    getAll,
    getContributors,
    getOne,
    removeContributor,
    search,
};

export default ProjectService;
export * from './types';
