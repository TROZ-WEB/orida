// Doc : https://typeorm.io/separating-entity-definition#extending-schemas
import { EntitySchemaColumnOptions } from 'typeorm';

const BaseColumnsSchema = {
    id: {
        type: 'uuid',
        primary: true,
        generated: 'uuid',
    } as EntitySchemaColumnOptions,

    createdAt: {
        name: 'created_at',
        type: 'timestamp with time zone',
        createDate: true,
    } as EntitySchemaColumnOptions,

    updatedAt: {
        name: 'updated_at',
        type: 'timestamp with time zone',
        updateDate: true,
    } as EntitySchemaColumnOptions,
};

export default BaseColumnsSchema;
