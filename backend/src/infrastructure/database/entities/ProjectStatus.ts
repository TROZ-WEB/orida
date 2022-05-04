/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, OneToMany } from 'typeorm';
import { ProjectStatus } from '../../../domain/Project';
import BaseColumns from './BaseColumns';
import { Project } from './Project';

interface ProjectStatusEntityConstructorProps {
    id: string;
    label: string;
    createdAt: Date;
    modifiedAt: Date;
}

@Entity('project_status')
class ProjectStatusEntity extends BaseColumns {
    @Column({ type: 'character varying' })
        label: string;

    @OneToMany(() => Project, (project) => project.status)
        projects: Project[];

    constructor({
        id,
        label,
        createdAt,
        modifiedAt,
    }: ProjectStatusEntityConstructorProps) {
        super(id, createdAt, modifiedAt);
        this.label = label;
        this.projects = [];
    }

    toDomain(): ProjectStatus {
        return new ProjectStatus({
            id: this.id,
            label: this.label,
        });
    }
}

export { ProjectStatusEntity };
