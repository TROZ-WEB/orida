import PollDomain from '../../domain/Poll';

interface createPollProps {
    projectId: string;
    question: string;
    responses: string[];
}

interface COREPollRepository {
    createPoll(pollData: createPollProps): Promise<PollDomain>;
    getPollByFormId(formId: string): Promise<PollDomain | undefined>;
}

export default COREPollRepository;
