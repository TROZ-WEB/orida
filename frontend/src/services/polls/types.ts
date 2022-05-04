export type Poll = {
    typeformId: string;
};

export const PollConverter = {
    fromApi(data: any): Poll {
        return {
            typeformId: data.typeformId,
        };
    },
};
