import PollDomain from '../../core/domain/Poll';
import COREPollRepository from '../../core/ports/repositories/COREPollRepository';
import PollAdapter from '../adapters/pollAdapter/index';
import PollEntity from '../database/entities/Poll.entity';
import PostEntity from '../database/entities/Post.entity';
import ProjectEntity from '../database/entities/Project.entity';

const createPoll: COREPollRepository['createPoll'] = async ({
    projectId,
    question,
    responses,
}): Promise<PollDomain> => {
    // create poll
    const pollId = await PollAdapter.create({ question, responses });
    await PollAdapter.createAnswerWebhook(pollId);

    const projectObject = await ProjectEntity.findOne({
        where: { id: projectId },
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
    const createdPost = await PostEntity.create({
        project: projectObject,
    });
    const savedPost = await PostEntity.save(createdPost);

    // create poll
    const poll = await PollEntity.create({
        externalPollId: pollId,
        post: savedPost,
    });
    const entity = await PollEntity.save(poll);

    return entity.toDomain();
};

const getPollByFormId: COREPollRepository['getPollByFormId'] = async (formId): Promise<PollDomain | undefined> => {
    const poll = await PollEntity.findOne({
        where: {
            externalPollId: formId,
        },
    });

    return poll ? poll.toDomain() : undefined;
};

// const getPollAnswersByUser: COREPollRepository['getPollAnswersByUser'] = async (user): Promise<PollDomain | undefined> => {
//     const poll = await pollResponseRepository.findOne({
//         where: {
//             user: {
//                 id: user.id,
//             },
//         },
//     });

//     return poll ? poll.toDomain() : null;
// };

export default { createPoll, getPollByFormId };
