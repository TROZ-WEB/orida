import { Repository } from 'typeorm';
import { Thread } from '../../domain/Thread';
import { Message as MessageEntity } from '../../infrastructure/database/entities/Message';
import { Thread as ThreadEntity } from '../../infrastructure/database/entities/Thread';
import ThreadError, { ThreadErrorType } from '../threads/ThreadError';
import MessageError, { MessageErrorType } from './MessageError';

interface Arg {
    id: string;
}

interface Context {
    threadRepository: Repository<ThreadEntity>;
    messageRepository: Repository<MessageEntity>;
}

const deleteMessage = ({
    id,
}: Arg) => async ({
    threadRepository,
    messageRepository,
}: Context): Promise<Thread> => {
    const message = await messageRepository.findOne({
        where: { id },
        relations: {
            thread: true,
        } });

    if (!message) {
        throw new MessageError(MessageErrorType.NotFound);
    }

    await messageRepository.remove([message]);

    const thread = await threadRepository.findOneBy({ id: message.thread.id });

    if (!thread) {
        throw new ThreadError(ThreadErrorType.NotFound);
    }

    return thread.toDomain();
};

export default deleteMessage;
