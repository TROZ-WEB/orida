import { Repository } from 'typeorm';
import { PollAdapterType } from '../../infrastructure/adapters/pollAdapter';
import { Poll as PollEntity } from '../../infrastructure/database/entities/Poll';
import { Post as PostEntity } from '../../infrastructure/database/entities/Post';
import { Project as ProjectEntity } from '../../infrastructure/database/entities/Project';

interface Arg {
    project: string; // project id
    question: string;
    responses: string[];
}

interface Context {
    pollAdapter: PollAdapterType;
    pollRepository: Repository<PollEntity>;
    postRepository: Repository<PostEntity>;
    projectRepository: Repository<ProjectEntity>;
}

const createPoll = ({
    project,
    question,
    responses,
}: Arg) => async ({
    pollAdapter,
    pollRepository,
    postRepository,
    projectRepository,
}: Context): Promise<boolean> => {
    // create poll
    const pollId = await pollAdapter.create({ question, responses });
    await pollAdapter.createAnswerWebhook(pollId);

    const projectObject = await projectRepository.findOne({
        where: { id: project },
        relations: {
            posts: {
                poll: {
                    responses: {
                        user: true,
                    },
                },
            },
        },
    });
    if (!projectObject) {
        throw Error('Project not found');
    }

    // create post
    const createdPost = await postRepository.create({
        project: projectObject,
    });
    const savedPost = await postRepository.save(createdPost);

    // create poll
    const createdPoll = await pollRepository.create({
        externalPollId: pollId,
        post: savedPost,
    });
    await pollRepository.save(createdPoll);

    return true;
};

export default createPoll;
