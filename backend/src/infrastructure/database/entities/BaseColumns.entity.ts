import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

export default class BaseColumns extends BaseEntity {
    @CreateDateColumn({ name: 'created-at' })
        createdAt!: Date;

    @UpdateDateColumn({ name: 'modified-at' })
        modifiedAt!: Date;

    @PrimaryGeneratedColumn('uuid')
        id!: string;
}
