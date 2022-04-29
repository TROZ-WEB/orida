import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import BaseColumns from './BaseColumns';
// eslint-disable-next-line import/no-cycle
import { Category } from './Category';

enum ProjectStatus {
    Design = 'DESIGN', // project is under conception
    Running = 'RUNNING', // project is going on
    Complete = 'COMPLETE', // project has been fully completed
}

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

    @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.Design })
        status: ProjectStatus;

    @Column({ type: 'character varying' })
        title: string;

    @ManyToMany(() => Category, (category: Category) => category.projects, { cascade: true })
    @JoinTable()
        categories: Category[];

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        budget: Number,
        description: string,
        participatoryBudgetYear: Number,
        startDate: Date,
        status: ProjectStatus,
        title: string,
        categories: Category[],
    ) {
        super(id, createdAt, modifiedAt);
        this.budget = budget;
        this.description = description;
        this.participatoryBudgetYear = participatoryBudgetYear;
        this.startDate = startDate;
        this.status = status;
        this.title = title;
        this.categories = categories;
    }
}

export { Project, ProjectStatus };
