/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Point } from 'geojson';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import ProjectDomain from '../../../core/domain/Project';
import BaseColumns from './BaseColumns.entity';
import Category from './Category.entity';
import Image from './Image.entity';
import Organization from './Organization.entity';
import Post from './Post.entity';
import ProjectContribution from './ProjectContribution.entity';
import ProjectStatusEntity from './ProjectStatus.entity';

@Entity('project')
export default class Project extends BaseColumns {
    @Column({ type: 'numeric', nullable: true })
        budget: Number | undefined;

    @Column({ type: 'text', nullable: true })
        description: string | undefined;

    @Column({ type: 'int', nullable: true, name: 'participatory-budget-year' })
        participatoryBudgetYear: Number | undefined;

    @Column({ type: 'timestamp with time zone', nullable: true, name: 'start-date' })
        startDate: Date | undefined;

    @Column({ type: 'character varying' })
        title!: string;

    @ManyToMany(() => Organization, (organization: Organization) => organization.projects, { cascade: true })
    @JoinTable()
        organizations: Organization[] = [];

    @ManyToMany(() => Category, (category: Category) => category.projects, { eager: true })
    @JoinTable()
        categories: Category[] = [];

    @ManyToOne(() => ProjectStatusEntity, (projectStatus) => projectStatus.projects, { eager: true, nullable: false })
    @JoinColumn({ name: 'status' })
        status!: ProjectStatusEntity;

    @OneToMany(() => Post, (post) => post.project, { cascade: true })
        posts: Post[] = [];

    @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
        location: Point | undefined;

    @OneToMany(
        () => ProjectContribution,
        (projectContribution) => projectContribution.project,
    )
        contributors: ProjectContribution[] = [];

    @OneToMany(() => Image, (image) => image.project, { eager: true, cascade: true })
        images: Image[] = [];

    toDomain(): ProjectDomain {
        return ({
            id: this.id,
            budget: this.budget,
            categories: this.categories?.map((c) => c.toDomain()) || [],
            contributors: this.contributors?.map((contributor) => contributor.toDomain()) || [],
            description: this.description,
            location: this.location
                ? { latitude: this.location.coordinates[0], longitude: this.location.coordinates[1] }
                : undefined,
            organizations: this.organizations?.map((o) => o.toDomain()) || [],
            participatoryBudgetYear: this.participatoryBudgetYear,
            posts: this.posts?.map((post) => post.toDomain()) || [],
            images: this.images?.map((image) => image.toDomain()) || [],
            startDate: this.startDate,
            status: this.status,
            title: this.title,
        });
    }
}
