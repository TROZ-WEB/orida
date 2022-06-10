/* eslint-disable import/no-cycle */
import Poll from './Poll';
import PollAnswer from './PollAnswer';

interface PollResults {
    poll: Poll;
    question: string;
    total: number;
    responses: PollAnswer[];
}

export default PollResults;
