/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Project as ProjectDomain } from '../../../domain/Project';
import BaseColumns from './BaseColumns';
import { Category } from './Category';
import { Organization } from './Organization';
import { Post } from './Post';
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

    @ManyToOne(() => ProjectStatusEntity, (projectStatus) => projectStatus.projects, { eager: true })
    @JoinColumn({ name: 'status' })
        status: ProjectStatusEntity;

    @OneToMany(() => Post, (post) => post.project, { cascade: true })
        posts: Post[];

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        budget: Number,
        description: string | null,
        participatoryBudgetYear: Number | null,
        startDate: Date | null,
        title: string,
        organizations: Organization[],
        categories: Category[],
        status: ProjectStatusEntity,
        posts: Post[],
    ) {
        super(id, createdAt, modifiedAt);
        this.budget = budget;
        this.description = description;
        this.participatoryBudgetYear = participatoryBudgetYear;
        this.startDate = startDate;
        this.title = title;
        this.organizations = organizations;
        this.categories = categories;
        this.status = status;
        this.posts = posts;
    }

    toDomain(): ProjectDomain {
        return {
            createdAt: this.createdAt,
            id: this.id,
            budget: this.budget,
            description: this.description,
            participatoryBudgetYear: this.participatoryBudgetYear,
            startDate: this.startDate,
            title: this.title,
            organizations: this.organizations?.map((o) => o.toDomain()) || [],
            categories: this.categories?.map((c) => c.toDomain()) || [],
            status: this.status,
            posts: this.posts?.map((post) => post.toDomain()) || [],
        };
    }
}

export { Project };
