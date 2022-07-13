/* eslint-disable import/no-cycle */
import Poll, { pollSnapshot } from './Poll';
import PollAnswer, { pollAnswerSnapshot } from './PollAnswer';

interface PollResults {
    poll: Poll;
    question: string;
    total: number;
    responses: PollAnswer[];
}

export const pollResultsSnapshot = (pollResults: PollResults): PollResults => Object.freeze({
    ...pollResults,
    poll: pollSnapshot(pollResults.poll),
    responses: pollResults.responses.map(pollAnswerSnapshot),
});

export default PollResults;
