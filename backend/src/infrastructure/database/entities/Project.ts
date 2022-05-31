/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Point } from 'geojson';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Project as ProjectDomain } from '../../../domain/Project';
import BaseColumns from './BaseColumns';
import { Category } from './Category';
import { Image } from './Image';
import { Organization } from './Organization';
import { Post } from './Post';
import { ProjectContribution } from './ProjectContribution';
import { ProjectStatusEntity } from './ProjectStatus';

@Entity('project')
class Project extends BaseColumns {
    @Column({ type: 'numeric', nullable: true })
        budget: Number;

    @Column({ type: 'text', nullable: true })
        description: string | null;

    @Column({ type: 'int', nullable: true, name: 'participatory-budget-year' })
        participatoryBudgetYear: Number | null;

    @Column({ type: 'timestamp with time zone', nullable: true, name: 'start-date' })
        startDate: Date | null;

    @Column({ type: 'character varying' })
        title: string;

    @ManyToMany(() => Organization, (organization: Organization) => organization.projects, { cascade: true })
    @JoinTable()
        organizations: Organization[];

    @ManyToMany(() => Category, (category: Category) => category.projects, { eager: true })
    @JoinTable()
        categories: Category[];

    @ManyToOne(() => ProjectStatusEntity, (projectStatus) => projectStatus.projects, { eager: true, nullable: false })
    @JoinColumn({ name: 'status' })
        status: ProjectStatusEntity;

    @OneToMany(() => Post, (post) => post.project, { cascade: true })
        posts: Post[];

    @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
        location?: Point;

    @OneToMany(
        () => ProjectContribution,
        (projectContribution) => projectContribution.project,
    )
        contributors: ProjectContribution[];

    @OneToMany(() => Image, (image) => image.project, { eager: true, cascade: true })
        images: Image[];

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        budget: Number,
        description: string | null,
        participatoryBudgetYear: Number | null,
        images: Image[],
        startDate: Date | null,
        title: string,
        organizations: Organization[],
        categories: Category[],
        status: ProjectStatusEntity,
        posts: Post[],
        contributors: ProjectContribution[],
        longitude?: number,
        latitude?: number,
    ) {
        super(id, createdAt, modifiedAt);
        this.budget = budget;
        this.categories = categories;
        this.contributors = contributors;
        this.description = description;
        this.organizations = organizations;
        this.participatoryBudgetYear = participatoryBudgetYear;
        this.posts = posts;
        this.images = images;
        this.startDate = startDate;
        this.status = status;
        this.title = title;

        this.location = latitude && longitude
            ? { type: 'Point', coordinates: [longitude, latitude] }
            : undefined;
    }

    toDomain(): ProjectDomain {
        return {
            createdAt: this.createdAt,
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
        };
    }
}

export { Project };
