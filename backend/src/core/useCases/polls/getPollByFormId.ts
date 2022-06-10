import PollDomain from '../../domain/Poll';
import PollError, { PollErrorType } from '../../errors/PollError';
import COREPollRepository from '../../ports/repositories/COREPollRepository';

interface Context {
    pollRepository: COREPollRepository;
}

const getPollByFormId = (formId: string) => async ({ pollRepository }: Context): Promise<PollDomain | undefined> => {
    const poll = await pollRepository.getPollByFormId(formId);

    if (!poll) {
        throw new PollError(PollErrorType.NotFound);
    }

    return poll;
};

export default getPollByFormId;
