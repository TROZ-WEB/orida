/* eslint-disable import/no-cycle */
import Category, { categorySnapshot } from './Category';
import Image, { imageSnapshot } from './Image';
import Organization, { organizationSnapshot } from './Organization';
import Post, { postSnapshot } from './Post';
import ProjectContribution, { projectContributionSnapshot } from './ProjectContribution';
import ProjectStatus, { projectStatusSnapshot } from './ProjectStatus';

export interface Position {
    latitude: number;
    longitude: number;
}

export interface Budget {
    min: number;
    max?: number;
}
interface Project {
    id: string;
    budget?: Number;
    description?: string;
    participatoryBudgetYear?: Number;
    images: Image[];
    startDate?: Date;
    status: ProjectStatus;
    title: string;
    organizations: Organization[];
    categories: Category[];
    posts: Post[];
    contributors: ProjectContribution[];
    location?: Position;
}

export const projectSnapshot = (project: Project): Project => Object.freeze({
    ...project,
    images: project.images.map(imageSnapshot),
    status: projectStatusSnapshot(project.status),
    organizations: project.organizations.map(organizationSnapshot),
    categories: project.categories.map(categorySnapshot),
    posts: project.posts.map(postSnapshot),
    contributors: project.contributors.map(projectContributionSnapshot),
});

export default Project;
