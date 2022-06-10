/* eslint-disable import/no-cycle */
import Project from './Project';

interface Category {
    id: string;
    color: string | undefined;
    label: string;
    projects: Project[];
}

export default Category;
