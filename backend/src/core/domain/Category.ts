/* eslint-disable import/no-cycle */
import Project, { projectSnapshot } from './Project';

interface Category {
    id: string;
    color?: string;
    label: string;
    projects: Project[];
}

export const categorySnapshot = (category: Category): Category => Object.freeze({
    ...category,
    projects: category.projects.map(projectSnapshot),
});

export default Category;
