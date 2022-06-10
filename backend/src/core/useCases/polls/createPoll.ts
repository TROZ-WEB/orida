import PollDomain from '../../domain/Poll';
import COREPollRepository from '../../ports/repositories/COREPollRepository';

interface Arg {
    projectId: string;
    question: string;
    responses: string[];
}

interface Context {
    pollRepository: COREPollRepository
}

const createPoll = ({
    projectId,
    question,
    responses,
}: Arg) => async ({
    pollRepository,
}: Context): Promise<PollDomain> => {
    const poll = await pollRepository.createPoll({
        projectId,
        question,
        responses,
    });

    return poll;
};

export default createPoll;
