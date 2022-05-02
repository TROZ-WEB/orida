/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, ManyToMany } from 'typeorm';
import { Category as CategoryDomain } from '../../../domain/Category';
import BaseColumns from './BaseColumns';
import { Project } from './Project';

@Entity('category')
class Category extends BaseColumns {
    @Column({ type: 'character varying', nullable: true })
        picture: string;

    @Column({ type: 'character varying' })
        label: string;

    @ManyToMany(() => Project, (project: Project) => project.categories)
        projects: Project[];

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        picture: string,
        label: string,
        projects: Project[],
    ) {
        super(id, createdAt, modifiedAt);
        this.picture = picture;
        this.label = label;
        this.projects = projects;
    }

    toDomain(): CategoryDomain {
        return {
            id: this.id,
            picture: this.picture,
            label: this.label,
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt,
            projects: [],
        };
    }
}

export { Category };
