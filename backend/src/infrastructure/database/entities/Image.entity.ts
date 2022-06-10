/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import ImageDomain from '../../../core/domain/Image';
import BaseColumns from './BaseColumns.entity';
import Project from './Project.entity';

@Entity('image')
export default class Image extends BaseColumns {
    @Column({ type: 'character varying' })
        url!: string;

    @ManyToOne(() => Project, (project: Project) => project.images, { nullable: false, cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'project' })
        project!: Project;

    toDomain(): ImageDomain {
        return {
            id: this.id,
            url: this.url,
            project: this.project?.toDomain(),
        };
    }
}
