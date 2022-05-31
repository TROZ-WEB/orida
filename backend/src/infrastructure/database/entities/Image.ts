/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Image as ImageDomain } from '../../../domain/Image';
import BaseColumns from './BaseColumns';
import { Project } from './Project';

@Entity('image')
class Image extends BaseColumns {
    @Column({ type: 'character varying' })
        url: string;

    @ManyToOne(() => Project, (project: Project) => project.images, { nullable: false, cascade: ['insert', 'update'] })
    @JoinColumn({ name: 'project' })
        project: Project;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        url: string,
        project: Project,
    ) {
        super(id, createdAt, modifiedAt);
        this.url = url;
        this.project = project;
    }

    toDomain(): ImageDomain {
        return {
            id: this.id,
            url: this.url,
            project: this.project?.toDomain(),
        };
    }
}

export { Image };
