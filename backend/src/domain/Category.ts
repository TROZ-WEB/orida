/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { Category as CategoryEntity } from '../infrastructure/database/entities/Category';
import AppDataSource from '../infrastructure/database/index';
import { Project } from './Project';

class Category {
    createdAt: Date;

    modifiedAt: Date;

    id: string;

    picture: string;

    label: string;

    projects: Project[];

    constructor(
        picture: string,
        label: string,
        projects: Project[],
    ) {
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.id = uuidv4();
        this.picture = picture;
        this.label = label;
        this.projects = projects;
    }
}

const categoryRepository = AppDataSource.getRepository(CategoryEntity);

export { Category, categoryRepository };
