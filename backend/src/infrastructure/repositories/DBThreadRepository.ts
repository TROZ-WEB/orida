/* eslint-disable max-len */
import ThreadDomain from '../../core/domain/Thread';
import ThreadError, { ThreadErrorType } from '../../core/errors/ThreadError';
import UserError, { UserErrorType } from '../../core/errors/UserError';
import COREThreadRepository from '../../core/ports/repositories/COREThreadRepository';
import MessageEntity from '../database/entities/Message.entity';
import PostEntity from '../database/entities/Post.entity';
import ProjectEntity from '../database/entities/Project.entity';
import ThreadEntity from '../database/entities/Thread.entity';
import UserEntity from '../database/entities/User.entity';

const createThread: COREThreadRepository['createThread'] = async ({ projectId, subject }): Promise<ThreadDomain> => {
    // get project
    const project = await ProjectEntity.findOne({
        where: { id: projectId },
    });
    if (!project) {
        throw Error('Project not found');
    }

    // create post
    const createdPost = await PostEntity.create({
        project,
    });
    const savedPost = await PostEntity.save(createdPost);

    // create thread
    const createdThread = await ThreadEntity.create({
        post: savedPost,
        createdAt: new Date(),
        subject,
    });
    const savedThread = await ThreadEntity.save(createdThread);

    return savedThread.toDomain();
};

const getThreadById: COREThreadRepository['getThreadById'] = async (id): Promise<ThreadDomain | undefined> => {
    const thread = await ThreadEntity.findOne({
        where: { id },
        relations: { messages: true },
    });

    return thread ? thread.toDomain() : undefined;
};

const createThreadMessage: COREThreadRepository['createThreadMessage'] = async ({
    threadId,
    authorId,
    content,
}): Promise<ThreadDomain> => {
    // Get thread
    const thread = await ThreadEntity.findOneBy({ id: threadId });
    if (!thread) {
        throw new ThreadError(ThreadErrorType.NotFound);
    }

    // Get author
    const user = await UserEntity.findOneBy({ id: authorId });
    if (!user) {
        throw new UserError(UserErrorType.NotFound);
    }

    // Create message
    const createdMessage = await MessageEntity.create({
        thread,
        author: user,
        content,
    });

    const savedMessage = await MessageEntity.save(createdMessage);

    // Get updated Thread
    const updatedthread = await ThreadEntity.findOne({
        where: { id: savedMessage.thread.id },
        relations: { messages: true },
    });

    if (!updatedthread) {
        throw new ThreadError(ThreadErrorType.NotFound);
    }

    return updatedthread.toDomain();
};

export default { createThread, getThreadById, createThreadMessage };
