// Doc : https://typeorm.io/separating-entity-definition
import { EntitySchema } from 'typeorm';
import { Project, ProjectStatus } from '../../../domain/Project';
import BaseColumnsSchema from './baseColumns';

export default new EntitySchema<Project>({
    name: Project.name,
    target: Project,
    columns: {
        ...BaseColumnsSchema,
        title: {
            type: 'character varying',
        },
        description: {
            type: 'text',
            nullable: true,
        },
        budget: {
            type: 'numeric',
            nullable: true,
        },
        participatoryBudgetYear: {
            name: 'participatory-budget-year',
            type: 'int',
            nullable: true,
        },
        startDate: {
            name: 'start-date',
            type: 'timestamp with time zone',
            nullable: true,
        },
        status: {
            type: 'enum',
            enum: ProjectStatus,
            default: ProjectStatus.Design,
        },
        // TODO : pictures, mainPlace, otherPlaces
    },
    checks: [
        { expression: '"budget" > 0' },
    ],
});
