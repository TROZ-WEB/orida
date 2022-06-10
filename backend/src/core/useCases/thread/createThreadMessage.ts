import ThreadDomain from '../../domain/Thread';
import ThreadError, { ThreadErrorType } from '../../errors/ThreadError';
import COREThreadRepository from '../../ports/repositories/COREThreadRepository';

interface Arg {
    threadId: string;
    authorId: string;
    content: string;
}

interface Context {
    threadRepository: COREThreadRepository;
}

const createThreadMessage = ({
    threadId,
    authorId,
    content,
}: Arg) => async ({
    threadRepository,
}: Context): Promise<ThreadDomain> => {
    const thread = await threadRepository.createThreadMessage({ threadId, authorId, content });

    if (!thread) {
        throw new ThreadError(ThreadErrorType.NotFound);
    }

    return thread;
};

export default createThreadMessage;
