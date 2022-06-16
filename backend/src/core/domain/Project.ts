/* eslint-disable import/no-cycle */
import Category from './Category';
import Image from './Image';
import Organization from './Organization';
import Post from './Post';
import ProjectContribution from './ProjectContribution';
import ProjectStatus from './ProjectStatus';

export interface Position {
    latitude: number;
    longitude: number;
}

export interface Budget {
    min: number;
    max: number | undefined;
}
interface Project {
    id: string;
    budget: Number | undefined;
    description: string | undefined;
    participatoryBudgetYear: Number | undefined;
    images: Image[];
    startDate: Date | undefined;
    status: ProjectStatus;
    title: string;
    organizations: Organization[];
    categories: Category[];
    posts: Post[];
    contributors: ProjectContribution[];
    location: Position | undefined;
}

export default Project;
