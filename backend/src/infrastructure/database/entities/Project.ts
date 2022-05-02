/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Project as ProjectDomain } from '../../../domain/Project';
import BaseColumns from './BaseColumns';
import { Category } from './Category';
import { ProjectStatusEntity } from './ProjectStatus';

@Entity('project')
class Project extends BaseColumns {
    @Column({ type: 'numeric', nullable: true })
        budget: Number;

    @Column({ type: 'text', nullable: true })
        description: string;

    @Column({ type: 'int', nullable: true, name: 'participatory-budget-year' })
        participatoryBudgetYear: Number;

    @Column({ type: 'timestamp with time zone', nullable: true, name: 'start-date' })
        startDate: Date;

    @Column({ type: 'character varying' })
        title: string;

    @ManyToMany(() => Category, (category: Category) => category.projects, { cascade: true })
    @JoinTable()
        categories: Category[];

    @ManyToOne(() => ProjectStatusEntity, (projectStatus) => projectStatus.projects, { eager: true })
    @JoinColumn({ name: 'status' })
        status: ProjectStatusEntity;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        budget: Number,
        description: string,
        participatoryBudgetYear: Number,
        startDate: Date,
        title: string,
        categories: Category[],
        status: ProjectStatusEntity,
    ) {
        super(id, createdAt, modifiedAt);
        this.budget = budget;
        this.description = description;
        this.participatoryBudgetYear = participatoryBudgetYear;
        this.startDate = startDate;
        this.title = title;
        this.categories = categories;
        this.status = status;
    }

    toDomain(): ProjectDomain {
        return {
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt,
            id: this.id,
            budget: this.budget,
            description: this.description,
            participatoryBudgetYear: this.participatoryBudgetYear,
            startDate: this.startDate,
            title: this.title,
            categories: [],
            status: this.status,
        };
    }
}

export { Project };
