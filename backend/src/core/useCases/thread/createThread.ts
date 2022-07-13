import ThreadDomain, { threadSnapshot } from '../../domain/Thread';
import COREThreadRepository from '../../ports/repositories/COREThreadRepository';

interface Arg {
    projectId: string;
    subject: string;
}

interface Context {
    threadRepository: COREThreadRepository;
}

const createThread = ({
    projectId,
    subject,
}: Arg) => async ({
    threadRepository,
}: Context): Promise<ThreadDomain> => {
    const thread = await threadRepository.createThread({ projectId, subject });

    return threadSnapshot(thread);
};

export default createThread;
