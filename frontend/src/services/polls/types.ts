export type Poll = {
    answered: boolean;
    pollId: string;
};

export const PollConverter = {
    fromApi(data: any): Poll {
        return {
            answered: data.answered,
            pollId: data.externalPollId,
        };
    },
};
