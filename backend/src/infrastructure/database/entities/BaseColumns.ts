import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class BaseColumns {
    @CreateDateColumn({ name: 'created-at' })
        createdAt: Date;

    @UpdateDateColumn({ name: 'modified-at' })
        modifiedAt: Date;

    @PrimaryGeneratedColumn('uuid')
        id: string;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
