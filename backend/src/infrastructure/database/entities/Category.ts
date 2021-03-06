/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, ManyToMany } from 'typeorm';
import { Category as CategoryDomain } from '../../../domain/Category';
import { Project as ProjectDomain } from '../../../domain/Project';
import BaseColumns from './BaseColumns';
import { Project } from './Project';

@Entity('category')
class Category extends BaseColumns {
    @Column({ type: 'character varying', nullable: true })
        color: string;

    @Column({ type: 'character varying' })
        label: string;

    @ManyToMany(() => Project, (project: Project) => project.categories)
        projects: ProjectDomain[];

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        color: string,
        label: string,
        projects: ProjectDomain[],
    ) {
        super(id, createdAt, modifiedAt);
        this.color = color;
        this.label = label;
        this.projects = projects;
    }

    toDomain(): CategoryDomain {
        return {
            id: this.id,
            color: this.color,
            label: this.label,
            projects: this.projects,
        };
    }
}

export { Category };
