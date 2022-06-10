import ThreadDomain from '../../domain/Thread';

interface createThreadProps {
    projectId: string;
    subject: string;
}

interface createThreadMessageProps {
    threadId: string;
    authorId: string;
    content: string;
}

interface COREThreadRepository {
    createThread(threadData: createThreadProps): Promise<ThreadDomain>;
    getThreadById(id: string): Promise<ThreadDomain | undefined>;
    createThreadMessage(messageData: createThreadMessageProps): Promise<ThreadDomain>;
}

export default COREThreadRepository;
