/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, OneToMany } from 'typeorm';
import ProjectStatusDomain from '../../../core/domain/ProjectStatus';
import BaseColumns from './BaseColumns.entity';
import Project from './Project.entity';

@Entity('project_status')
export default class ProjectStatusEntity extends BaseColumns {
    @Column({ type: 'character varying' })
        label!: string;

    @OneToMany(() => Project, (project) => project.status)
        projects: Project[] = [];

    toDomain(): ProjectStatusDomain {
        return ({
            id: this.id,
            label: this.label,
        });
    }
}
