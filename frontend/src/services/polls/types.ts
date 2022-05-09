export type Poll = {
    id: string;
    answered: boolean;
    pollId: string;
};

interface PollResultResponse {
    id: string;
    count: number;
    label: string;
}

export type PollResult = {
    pollId: string;
    question: string;
    responses: PollResultResponse[];
    totalResponses: number;
};

export const PollConverter = {
    fromApi(data: any): Poll {
        return {
            id: data.id,
            answered: data.answered,
            pollId: data.externalPollId,
        };
    },
};
