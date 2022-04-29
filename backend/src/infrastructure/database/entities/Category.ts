import { Entity, Column, ManyToMany } from 'typeorm';
import BaseColumns from './BaseColumns';
// eslint-disable-next-line import/no-cycle
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
}

export { Category };
