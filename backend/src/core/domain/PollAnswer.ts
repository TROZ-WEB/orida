interface PollAnswer {
    id: string;
    label: string;
    count: number;
}

export const pollAnswerSnapshot = (pollAnswer: PollAnswer): PollAnswer => Object.freeze(pollAnswer);

export default PollAnswer;
