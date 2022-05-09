/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Poll } from './Poll';
import PollAnswer from './PollAnswer';

class PollResults {
    poll: Poll;

    question: string;

    total: number;

    responses: PollAnswer[];

    constructor(
        poll: Poll,
        question: string,
        total: number,
        responses: PollAnswer[],
    ) {
        this.poll = poll;
        this.question = question;
        this.total = total;
        this.responses = responses;
    }
}

export { PollResults };
