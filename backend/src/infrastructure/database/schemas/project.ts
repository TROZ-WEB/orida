import { EntitySchema } from 'typeorm';
import { Project } from '../../../domain/Project';

export default new EntitySchema<Project>({
    name: Project.name,
    target: Project,
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        title: {
            type: 'character varying',
        },
        status: {
            type: 'character varying',
        },
    },
});
