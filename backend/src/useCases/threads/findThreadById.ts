import { Repository } from 'typeorm';
import { Thread } from '../../domain/Thread';
import { Thread as ThreadEntity } from '../../infrastructure/database/entities/Thread';

interface Context {
    threadRepository: Repository<ThreadEntity>;
}

const findThreadById = (id: string) => (
    async ({ threadRepository }: Context): Promise<Thread | null> => {
        const entity = await threadRepository.findOne({
            where: { id },
            relations: { messages: true },
        });

        return entity ? entity.toDomain() : null;
    }
);

export default findThreadById;
