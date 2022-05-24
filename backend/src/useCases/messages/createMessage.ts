import { Repository } from 'typeorm';
import { Thread } from '../../domain/Thread';
import { Message as MessageEntity } from '../../infrastructure/database/entities/Message';
import { Thread as ThreadEntity } from '../../infrastructure/database/entities/Thread';
import { User as UserEntity } from '../../infrastructure/database/entities/User';
import ThreadError, { ThreadErrorType } from '../threads/ThreadError';
import UserError, { UserErrorType } from '../users/UserError';

interface Arg {
    threadId: string;
    authorId: string;
    content: string;
}

interface Context {
    userRepository: Repository<UserEntity>;
    threadRepository: Repository<ThreadEntity>;
    messageRepository: Repository<MessageEntity>;
}

const createMessage = ({
    threadId,
    authorId,
    content,
}: Arg) => async ({
    userRepository,
    threadRepository,
    messageRepository,
}: Context): Promise<Thread> => {
    // Get thread
    const threadObject = await threadRepository.findOneBy({ id: threadId });
    if (!threadObject) {
        throw new ThreadError(ThreadErrorType.NotFound);
    }

    // Get author
    const userObject = await userRepository.findOneBy({ id: authorId });
    if (!userObject) {
        throw new UserError(UserErrorType.NotFound);
    }

    // Create message
    const createdMessage = await messageRepository.create({
        thread: threadObject,
        author: userObject,
        content,
    });
    const savedMessage = await messageRepository.save(createdMessage);

    // Get updated Thread
    const updatedthreadObject = await threadRepository.findOne({
        where: { id: savedMessage.thread.id },
        relations: { messages: true },
    });
    if (!updatedthreadObject) {
        throw new ThreadError(ThreadErrorType.NotFound);
    }

    return updatedthreadObject.toDomain();
};

export default createMessage;
