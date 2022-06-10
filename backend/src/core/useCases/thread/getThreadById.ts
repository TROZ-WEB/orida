import ThreadDomain from '../../domain/Thread';
import ThreadError, { ThreadErrorType } from '../../errors/ThreadError';
import COREThreadRepository from '../../ports/repositories/COREThreadRepository';

interface Context {
    threadRepository: COREThreadRepository;
}

const findThreadById = (id: string) => (
    async ({ threadRepository }: Context): Promise<ThreadDomain> => {
        const thread = await threadRepository.getThreadById(id);

        if (!thread) {
            throw new ThreadError(ThreadErrorType.NotFound);
        }

        return thread;
    }
);

export default findThreadById;
