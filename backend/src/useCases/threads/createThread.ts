import { Repository } from 'typeorm';
import { Thread } from '../../domain/Thread';
import { Post as PostEntity } from '../../infrastructure/database/entities/Post';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';
import { Thread as ThreadEntity } from '../../infrastructure/database/entities/Thread';

interface Arg {
    project: string; // project id
    subject: string;
}

interface Context {
    postRepository: Repository<PostEntity>;
    projectRepository: Repository<ProjectEntity>;
    threadRepository: Repository<ThreadEntity>;
}

const createThread = ({
    project,
    subject,
}: Arg) => async ({
    postRepository,
    projectRepository,
    threadRepository,
}: Context): Promise<Thread> => {
    // get project
    const projectObject = await projectRepository.findOne({
        where: { id: project },
    });
    if (!projectObject) {
        throw Error('Project not found');
    }

    // create post
    const createdPost = await postRepository.create({
        project: projectObject,
    });
    const savedPost = await postRepository.save(createdPost);

    // create thread
    const createdThread = await threadRepository.create({
        post: savedPost,
        createdAt: new Date(),
        subject,
    });
    const savedThread = await threadRepository.save(createdThread);

    return savedThread.toDomain();
};

export default createThread;
