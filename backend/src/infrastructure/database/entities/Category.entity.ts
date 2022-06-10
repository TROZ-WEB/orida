/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, ManyToMany } from 'typeorm';
import CategoryDomain from '../../../core/domain/Category';
import ProjectDomain from '../../../core/domain/Project';
import BaseColumns from './BaseColumns.entity';
import Project from './Project.entity';

@Entity('category')
export default class Category extends BaseColumns {
    @Column({ type: 'character varying', nullable: true })
        color!: string | undefined;

    @Column({ type: 'character varying' })
        label!: string;

    @ManyToMany(() => Project, (project: Project) => project.categories)
        projects!: ProjectDomain[];

    toDomain(): CategoryDomain {
        return {
            id: this.id,
            color: this.color,
            label: this.label,
            projects: this.projects,
        };
    }
}
